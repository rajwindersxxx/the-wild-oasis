import uuid4 from 'uuid4';
import BookingDataBox from '../bookings/BookingDataBox';
import { useGuestHistory } from './useGuestHistory';
import Heading from '../../ui/Heading';
import styled from 'styled-components';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import { useMoveBack } from '../../hooks/useMoveBack';
import Table from '../../ui/Table';
import Spinner from '../../ui/Spinner';
import { formatCurrency } from '../../utils/helpers';

const StyledRow = styled.div`
  padding: 2.4rem;
`;
const StyledRow2 = styled.div`
  padding: 2.4rem 0;
`;
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  justify-content: space-between;
  padding: 2.4rem 0;
`;
const StyledGrid = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 2.4rem;
  padding: 0 2.4rem;
`;
const Price = styled.span`
  font-family: 'Sono';
  font-weight: 600;
`;
const SubHeading = styled.span`
  color: var(--color-grey-500);
`;
function GuestBookingHistory() {
  const moveBack = useMoveBack();
  const { isLoading, error, bookingHistory, count } = useGuestHistory();
  if (!bookingHistory || bookingHistory?.length === 0)
    return <Heading>No bookings Yet</Heading>;
  const guestName = bookingHistory[0]?.guests.fullName;
  const guestId = bookingHistory[0]?.guestId;
  if (isLoading) return <Spinner />;

  const TotalPayments = bookingHistory.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0
  );
  const PendingPayments = bookingHistory.reduce(
    (acc, cur) => acc + (cur.isPaid ? 0 : cur.totalPrice),
    0
  );
  const PastPayments = bookingHistory.reduce(
    (acc, cur) => acc + (cur.isPaid ? cur.totalPrice : 0),
    0
  );
  const TotalNights = bookingHistory.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );
  return (
    <>
      <HeadingGroup>
        <Heading as="h1">
          Booking History of <SubHeading>{guestName} </SubHeading>
        </Heading>
        <Heading as="h1"> #{guestId}</Heading>
      </HeadingGroup>

      <Table columns="1fr 1fr 1fr">
        <Table.Body
          data={bookingHistory}
          render={(booking) => (
            <StyledRow>
              <BookingDataBox booking={booking} key={uuid4()} />
            </StyledRow>
          )}
        ></Table.Body>
        <Table.Footer>
          <StyledGrid>
            {TotalNights !== 0 && (
              <Tag fontSize="1.15rem" type="grey">
                Total Nights : {TotalNights}
              </Tag>
            )}
            {PastPayments !== 0 && (
              <Tag fontSize="1.15rem" type="blue">
                Past payments : <Price>{formatCurrency(PastPayments)}</Price>
              </Tag>
            )}
            {PendingPayments !== 0 && (
              <Tag fontSize="1.15rem" type="yellow">
                Pending Payments:{' '}
                <Price> {formatCurrency(PendingPayments)}</Price>
              </Tag>
            )}
            {TotalPayments !== 0 && (
              <Tag fontSize="1.15rem" type="green">
                Total Payment: <Price>{formatCurrency(TotalPayments)}</Price>
              </Tag>
            )}
          </StyledGrid>
        </Table.Footer>
      </Table>
      <StyledRow2>
        <ButtonGroup>
          <Button $variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </StyledRow2>
    </>
  );
}

export default GuestBookingHistory;
