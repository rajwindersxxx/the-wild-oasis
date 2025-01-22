import { useEffect, useState } from 'react';
import Input from '../../ui/Input';
import TableOperations from '../../ui/TableOperations';
import { useSearchParams } from 'react-router-dom';

function GuestTableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearch(e) {
    searchParams.set('search', e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <TableOperations>
      <Input placeholder="search by GuestName or #Id" onChange={handleSearch} />
    </TableOperations>
  );
}

export default GuestTableOperations;
