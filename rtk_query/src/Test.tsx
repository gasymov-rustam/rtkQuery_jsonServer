import { useSelector } from 'react-redux';
import { goodsApi, RootState, useAppSelector } from './redux';

const getAllProducts = (state: RootState) => goodsApi.endpoints.getAllProducts.select()(state).data;

export const Test = () => {
  // const state = useAppSelector((state) => state.goodsApi.select()(state).data);
  const state = useAppSelector(getAllProducts);
  console.log(state);

  return (
    <div style={{ marginTop: 100 }}>
      Hello
      {state?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
