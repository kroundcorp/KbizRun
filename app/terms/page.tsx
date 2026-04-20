import { Suspense } from 'react';
import Terms from '../../src/views/Terms';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Terms />
    </Suspense>
  );
}
