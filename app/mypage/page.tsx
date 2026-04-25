import { Suspense } from 'react';
import Page from '../../src/views/MyPage';

export default function MyPageRoute() {
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}
