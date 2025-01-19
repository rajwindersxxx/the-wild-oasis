/* eslint-disable react/prop-types */
import styled from 'styled-components';
import SpinnerMini from './SpinnerMini';
import uuid4 from 'uuid4';

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({
  options,
  value,
  name,
  label,
  isLoading,
  onChange,
  ...props
}) {
  if (isLoading) return <SpinnerMini />;
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options?.map((option) => (
        <option value={option[name]} key={uuid4()}>
          {option[label]}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
