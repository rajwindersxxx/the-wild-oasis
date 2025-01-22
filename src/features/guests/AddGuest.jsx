import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateGuestForm from './CreateGuestForm';
import Row from '../../ui/Row';

function AddGuest() {
  return (
    <Modal>
      <Modal.Open opens={'createGuest'}>
          <Row $type="flex-end">
            <Button>Create a Guest</Button>
          </Row>
      </Modal.Open>
      <Modal.Window name={'createGuest'}>
        <CreateGuestForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddGuest;
