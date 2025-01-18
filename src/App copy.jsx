import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

const StyledApp = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Row>
        <StyledApp>
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button
                variation="primary"
                size="medium"
                onClick={() => alert('test')}
              >
                Check in
              </Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert('test')}
              >
                Check out
              </Button>
            </div>
          </Row>

          <Row>
            <form>
              <Input type="number" placeholder="number of guest"></Input>
              <Input type="number" placeholder="number of guest"></Input>
            </form>
          </Row>
          <Heading as="h3">Form</Heading>
        </StyledApp>
      </Row>
    </>
  );
}

export default App;
