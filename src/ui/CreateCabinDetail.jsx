/* eslint-disable react/prop-types */
import CabinRow from '../features/cabins/CabinRow';
import Menus from './Menus';
import SpinnerMini from './SpinnerMini';
import Table from './Table';

function CreateCabinDetail({ cabins }) {
  if (!cabins) return <SpinnerMini />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Body
          data={cabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CreateCabinDetail;
