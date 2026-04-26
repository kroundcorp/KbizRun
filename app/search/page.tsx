import { Suspense } from 'react';
import Page from '../../src/views/Search';

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}
