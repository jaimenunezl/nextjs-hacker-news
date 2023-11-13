import { Header, Switch } from '../_components';

function LayoutPage({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="flex justify-center my-20">
        <Switch options={['all', 'my faves']} />
      </div>
      <div className="px-2 lg:px-20">{children}</div>
    </div>
  );
}

export default LayoutPage;
