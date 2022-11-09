import { useSelector } from 'react-redux';
import { useAppSelector } from './redux';

export const Test = () => {
  const state = useAppSelector((state) => state.goodsApi.queries);
  console.log(state);
  return <div style={{ marginTop: 100 }}>Hello</div>;
};
