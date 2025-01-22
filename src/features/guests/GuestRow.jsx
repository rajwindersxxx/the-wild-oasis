import { HiClock, HiOutlinePencil, HiTrash } from 'react-icons/hi2';
import { Flag } from '../../ui/Flag';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';
import Tag from '../../ui/Tag';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteGuest } from './useDeleteGuest';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
function GuestRow({ guest }) {
  const { deleteGuest } = useDeleteGuest();
  const navigate = useNavigate();
  const bookingStatus = guest.bookings;

  const isActiveBooking =
    bookingStatus.filter((item) => item.status !== 'checked-out').length > 0;

  const {
    fullName,
    email,
    nationalID,
    nationality,
    countryFlag,
    id: guestId,
  } = guest;
  return (
    <Table.Row>
      <div>#{guestId}</div>
      <div>{fullName}</div>
      <div>{email}</div>
      <div>{nationalID}</div>
      <div>{nationality}</div>
      <Flag src={countryFlag} alt={`Flag of ${nationality}`} />

      {isActiveBooking && <Tag type="green">active booking</Tag>}
      {!isActiveBooking && bookingStatus.length > 0 && (
        <Tag type="blue">no active Booking</Tag>
      )}
      {!isActiveBooking && bookingStatus.length === 0 && (
        <Tag type="silver">no Booking YET</Tag>
      )}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={guestId}></Menus.Toggle>
          <Menus.List id={guestId}>
            {bookingStatus.length !== 0 && (
              <Menus.Button
                icon={<HiClock />}
                onClick={() => navigate(`/bookingHistory/${guestId}`)}
              >
                History
              </Menus.Button>
            )}
            <Menus.Button
              icon={<HiOutlinePencil />}
              // onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Edit details
            </Menus.Button>
            {!status && (
              <Modal.Open opens={'delete'}>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name={'delete'}>
          <ConfirmDelete
            resourceName={'Booking'}
            onConfirm={() => deleteGuest(guestId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default GuestRow;
