import uuid4 from 'uuid4';
import BookingDataBox from '../bookings/BookingDataBox';
import { useGuestHistory } from './useGuestHistory';
import Heading from '../../ui/Heading';
import styled from 'styled-components';
import Tag from '../../ui/Tag';
import Pagination from '../../ui/Pagination';
import Row from '../../ui/Row';
import { useNavigate } from 'react-router-dom';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import { useMoveBack } from '../../hooks/useMoveBack';

const StyledRow = styled.div`
  padding-bottom: 2.4rem;
  display: flex;
  justify-content: space-between;
`;
const Footer = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:not(:has(*)) {
    display: none;
  }
`;
const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  justify-content: space-between;
`;
const StyledGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
function GuestBookingHistory() {
  const moveBack = useMoveBack();
  const { isLoading, error, bookingHistory, count } = useGuestHistory();
  if (!bookingHistory || bookingHistory?.length === 0)
    return <Heading>No bookings Yet</Heading>;
  const guestName = bookingHistory[0]?.guests.fullName;
  const guestId = bookingHistory[0]?.guestId;

  return (
    <StyledGrid>
        <HeadingGroup>
          <Heading as="h1">Booking History of {guestName}</Heading>
          <Heading as="h1"> #{guestId}</Heading>
        </HeadingGroup>
        {/* <ButtonText onClick={moveBack}>&larr; Back</ButtonText> */}

      {bookingHistory?.map((booking) => {
        return <BookingDataBox booking={booking} key={uuid4()} />;
      })}

      <ButtonGroup>
        <Button $variation="primary" onClick={moveBack}>
          go Back
        </Button>
      </ButtonGroup>
    </StyledGrid>
  );
}

export default GuestBookingHistory;
