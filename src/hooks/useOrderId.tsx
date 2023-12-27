import { useSessionStorage } from '@uidotdev/usehooks';

export const useOrderId = () => {
  const [orderId, setOrderId] = useSessionStorage('orderId', '');

  return { orderId, setOrderId };
};
