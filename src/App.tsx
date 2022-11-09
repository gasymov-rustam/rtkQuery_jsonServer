import { useState } from 'react';
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useLazyGetAllProductsQuery,
  useUpdateProductMutation,
} from './redux';
import { Test } from './Test';
import { IGood } from './types/IGood';

export const App = () => {
  // const { data } = useGetProductByIdQuery(1);
  const [lazyLoad, { error, isLoading, data: newData }] = useLazyGetAllProductsQuery();
  const [value, setValue] = useState('');
  const [updateValue, setUpdateValue] = useState('');
  const { data, refetch } = useGetAllProductsQuery(1000);
  const [createProduct, { error: createError, isLoading: isCreateLoading }] =
    useAddProductMutation();
  const [deleteProduct, { data: deleteData }] = useDeleteProductMutation();
  const [updateProduct, { data: updateData }] = useUpdateProductMutation();

  const addProduct = async () => {
    const product: Partial<IGood> = {
      name: value,
    };

    await createProduct(product).unwrap();
    refetch();
    setValue('');
  };

  const updateNewProduct = async (product: IGood) => {
    await updateProduct({ ...product, name: updateValue }).unwrap();
    // refetch();
    setValue('');
  };

  // console.log('delete', deleteData);
  // console.log('update', updateData);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', width: '400px', gap: 20 }}>
        <button onClick={() => lazyLoad(3)}>Lazy Load</button>
        <button onClick={addProduct}>add Good</button>
        <input
          type='text'
          placeholder='update'
          value={updateValue}
          onChange={(e) => setUpdateValue(e.target.value)}
        />

        <input type='text' value={value} onChange={(e) => setValue(e.target.value)} />
        <ul>
          {(newData ?? data)?.map((good) => (
            <li key={good.id}>
              <button onClick={() => updateNewProduct(good)}>update Good</button>
              <div onClick={() => deleteProduct(good.id)}>{good.name}</div>
            </li>
          ))}
        </ul>
      </div>
      <Test />
    </>
  );
};
