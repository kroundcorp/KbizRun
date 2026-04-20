import { Suspense } from 'react';
import CheckoutComplete from '../../../../src/views/CheckoutComplete';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CheckoutComplete />
    </Suspense>
  );
}
