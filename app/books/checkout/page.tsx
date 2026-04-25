import { Suspense } from 'react';
import BookCheckout from '../../../src/views/BookCheckout';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <BookCheckout />
    </Suspense>
  );
}
