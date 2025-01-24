/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import Menus from './Menus';
import SpinnerMini from './SpinnerMini';
import Table from './Table';
import { formatCurrency } from '../utils/helpers';
import styled from 'styled-components';
import uuid4 from 'uuid4';

const Img2 = styled.img`
  display: block;
  width: 5.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;
const StyledDev = styled.div`
  text-align: center;
`;

function SelectedCabinDetails({ cabins }) {
  const memoizedCabins = useMemo(() => {
    const cabinsData = [cabins];
    if (!cabins) return <SpinnerMini />;
    return (
      <StyledDev>
        <Menus>
          <Table columns=" 0.6fr 1fr 1fr 1fr 0.5fr ">
            <Table.Header>
              <div></div>
              <div>Cabin Name</div>
              <div>Capacity</div>
              <div>Price</div>
              <div>Discount</div>
            </Table.Header>
            <Table.Body
              data={cabinsData}
              render={(cabin) => (
                <SelectedCabinRow cabin={cabin} key={uuid4()} />
              )}
            />
          </Table>
        </Menus>
      </StyledDev>
    );
  }, [cabins]);
  return memoizedCabins;
}

function SelectedCabinRow({ cabin }) {
  const { name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <Table.Row>
      <Img2 src={image} />
      <Cabin>#{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
    </Table.Row>
  );
}

export default SelectedCabinDetails;
