import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#e0f2fe',
      fontSize: '14px',
      fontWeight: 'bold',
      color: 'white',
    },
  },
  pagination: {
    style: {
      backgroundColor: '#e0f2fe',
      fontSize: '14px',
      fontWeight: 'bold',
      gap: '20px',
      borderRadius: '0 0 10px 10px',
    },
  },
  rows: {
    style: {
      borderRadius: '10px',
      margin: '10px 0',
    },
  },
  tableWrapper: {
    style: {
      borderRadius: '10px',
      overflow: 'hidden',
    },
  },
};

const opcoes = {
  rowsPerPageText: 'Linhas por página:',
  rangeSeparatorText: 'de',
};

const DefaultDataTable = ({ title, columns, data }) => {
  const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        columns.some((column) => {
          const value = column.selector(item);
          return (
            value &&
            value.toString().toLowerCase().includes(filterText.toLowerCase())
          );
        }),
      ),
    );
  }, [filterText, data, columns]);

  const handleFilter = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <div>
      <div className="search-div">
        <SearchSharpIcon sx={{ fill: '#6b7280' }} />
        <input
          type="text"
          placeholder="Pesquisar"
          value={filterText}
          onChange={handleFilter}
          className="search-input"
        />
      </div>
      <DataTable
        title={title}
        columns={columns}
        data={filteredData}
        noDataComponent={'Lista vazia'}
        customStyles={customStyles}
        paginationComponentOptions={opcoes}
        pagination
        paginationPerPage={5}
      />
    </div>
  );
};

export default DefaultDataTable;
