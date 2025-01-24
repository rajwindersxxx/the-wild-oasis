/* eslint-disable react/prop-types */
import uuid4 from 'uuid4';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import { useMemo } from 'react';
import { formatCurrency } from '../../utils/helpers';
import styled from 'styled-components';
const StyledDev = styled.div`
  text-align: center;
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
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;
function TotalBookingCost({ bookingCost }) {
  const memoizedGuests = useMemo(() => {
    const bookingData = [bookingCost];
    if (!bookingCost) return <></>;
    return (
      <StyledDev>
        <Menus>
          <Table columns=" 1fr 1fr 1fr 1fr 1fr 1fr">
            <Table.Header>
              <div> date from</div>
              <div>date to</div>
              <div>NO of Nights</div>
              <div>Extra Cost</div>
              <div>discount</div>
              <div>TotalPrice</div>
            </Table.Header>
            <Table.Body
              data={bookingData}
              render={(guest) => (
                <SelectedGuestRow guest={guest} key={uuid4()} />
              )}
            />
          </Table>
        </Menus>
      </StyledDev>
    );
  }, [bookingCost]);

  return memoizedGuests;
}

function SelectedGuestRow({ guest }) {
  const { startDate, endDate, numNights, extrasPrice, discount, totalPrice } =
    guest;
  return (
    <Table.Row>
      <div>{startDate || <span>&mdash;</span>}</div>
      <div>{endDate || <span>&mdash;</span>}</div>
      <Cabin>{Number(numNights) > 0 ? `${numNights} ${numNights == 1 ? 'night' : 'nights'}` : <span>&mdash;</span>}</Cabin>
      <Price>
        {extrasPrice > 0 ? formatCurrency(extrasPrice) : <span>&mdash;</span>}
      </Price>
      <Discount>
        {discount > 0 ? formatCurrency(discount) : <span>&mdash;</span>}
      </Discount>
      <Price>
        {totalPrice > 0 ? formatCurrency(totalPrice) : <span>&mdash;</span>}
      </Price>
    </Table.Row>
  );
}

export default TotalBookingCost;
