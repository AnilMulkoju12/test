/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  MenuItem,
  Pagination,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";

// import {
//   clearAllTableFilters,
//   clearSelectedRowsTable,
//   onChangeFilters,
//   onChangeSortby,
//   onPageChange,
//   onSelectionChange,
// } from "../../redux/features/tableSlice";
import { useDispatch, useSelector } from "react-redux";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";
import { MdKeyboardArrowDown, MdOutlineDelete } from "react-icons/md";
import { useOutsideClick } from "../../helpers/hooks/useOutsideClick";
import { IoIosWarning, IoMdCloseCircleOutline } from "react-icons/io";
import DatePicker from "react-datepicker";

export function SearchMenu({ options, value, onChange, ref, handleFocus }) {
  return (
    <div
      className='table-menu-container'
      ref={ref}
      style={{ height: options?.length > 5 ? 150 : "" }}
      onFocus={handleFocus}
    >
      {options?.length !== 0 ? (
        options?.map((item) => (
          <p
            key={item?.value}
            className={`menu-item ${value === item.value ? "active" : ""}`}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </p>
        ))
      ) : (
        <p className='menu-item'>No Options</p>
      )}
    </div>
  );
}

function Table({
  showRowsLength,
  columns = [],
  statusAgent,
  removeFilters,
  dataLength,
  refresh,
  marginNoData,
  loading,
  rowPadding,
  filterslength,
  rows = [],
  hideRows,
  handleInputBlur,
  handleInputChange,
  headerValue,
  typeTab,
  renderOnlineBtn,
  handleOnClickHeader,
  checkboxSelection = false,
  totalRecords = 0,
  disableSearch = false,
  disableSortby = true,
  handleDoubleClick = () => {},
}) {
  const limitOptions = [5, 10, 20, 30, 40, 50];
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();

  const [sortType, setSortType] = useState(null);
  const [sortByField, setSortByField] = useState(null);

  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);
  const [focusedField, setFocusedField] = useState(null);
  const { filters: filtersDataRedux, clearTableFilters } = useSelector(
    (state) => state.table
  );
  console.log(
    filtersDataRedux,
    activeFilters,
    filters,
    clearTableFilters,
    "filters-redux"
  );
  const isLoading = useSelector((state) => state.table.isLoading);
  const tab = useSelector((state) => state.table.tab);
  const clearSelectedRows = useSelector(
    (state) => state.table.clearSelectedRows
  );

  const totalPages = Math.ceil(totalRecords / itemsPerPage);

  const startIndex = currentPage * itemsPerPage - itemsPerPage + 1;
  const endIndex = currentPage * itemsPerPage;
  useEffect(() => {
    if (clearSelectedRows) {
      setSelectedRows([]);
      dispatch(clearSelectedRowsTable(false));
    }
  }, [clearSelectedRows]);
  useEffect(() => {
    const data = {
      tab: typeTab,
      page: currentPage,
      limit: itemsPerPage,
    };
    setSelectedRows([]);
    dispatch(onPageChange(data));
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const data = {
      sortorder: sortType,
      sortdatafield: sortByField,
    };

    if (sortByField === null) {
      dispatch(onChangeSortby({}));
    } else {
      dispatch(onChangeSortby(data));
    }
  }, [sortByField, sortType]);

  console.log(selectedRows, "rowsSelectyed");

  useEffect(() => {
    if (selectedRows.length > 0) {
      setSelectedRows([]);
    }
  }, []);
  useEffect(() => {
    dispatch(onSelectionChange(selectedRows));
  }, [JSON.stringify(selectedRows)]);

  useEffect(() => {
    const interval = setTimeout(() => {
      function replaceObj(key, value) {
        if (value === "") {
          return undefined;
        }
        return value;
      }

      let filtersData = JSON.stringify(filters, replaceObj);
      filtersData = JSON.parse(filtersData);

      setCurrentPage(1);
      dispatch(onChangeFilters(filtersData));
    }, 1500);

    return () => clearTimeout(interval);
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    setCurrentPage(1);
    setSortByField(null);
    setSortType(null);
    setSelectedRows([]);
    setFilters({});
    setActiveFilters([]);
    dispatch(onChangeFilters({}));
  }, [tab]);
  useEffect(() => {
    if (filtersDataRedux?.filters) {
      setFilters(filtersDataRedux?.filters);
      setActiveFilters(filtersDataRedux?.activeFilters);
    }
  }, [filtersDataRedux]);
  console.log(selectedRows, statusAgent, "selectedae");

  function handleRowStatusChange(updatedRow, newStatus) {
    setSelectedRows((prevSelectedRows) => {
      const changedRow = rows.find(
        (row) => row?.agent_id?.value === updatedRow?.agent_id
      );

      if (!changedRow) return prevSelectedRows; // Exit early if the changedRow is not found

      const rowExists = prevSelectedRows.some(
        (row) => row?.id === changedRow?.id
      );

      if (newStatus === 1) {
        if (
          selectAll ||
          (rowExists &&
            !prevSelectedRows.some((row) => row.id === changedRow.id))
        ) {
          return [...prevSelectedRows, changedRow];
        }
      } else {
        if (rowExists) {
          return prevSelectedRows.filter((row) => row.id !== changedRow.id);
        }
      }

      // Return unchanged selected rows if no conditions matched
      return prevSelectedRows;
    });
  }

  useEffect(() => {
    handleRowStatusChange(statusAgent, statusAgent?.status);
  }, [statusAgent]);
  console.log(rows, "rowsssss");

  function handleRowsSelection(row) {
    const isSelected = selectedRows?.some((item) => item?.id === row?.id);

    let updatedSelection;

    if (isSelected && row?.status?.value === 1) {
      // If already selected, remove it from selectedRows
      updatedSelection = selectedRows?.filter((item) => item?.id !== row?.id);
    } else {
      // If not selected, add it to selectedRows
      updatedSelection = [...selectedRows, row];
    }

    setSelectedRows(updatedSelection);
    setSelectAll(updatedSelection.length === activeRows.length); // Update selectAll checkbox state
  }

  const activeRows = rows?.filter((item) => item?.status?.value === 1);
  const [selectAll, setSelectAll] = useState(false);

  function handleSelectAll(e) {
    const isChecked = e.target.checked;

    setSelectAll(isChecked);
    setSelectedRows(isChecked ? activeRows : []); // Select all active rows or clear selection
  }
  function handleSortBy(value) {
    setSortByField(value);

    if (sortType === null || sortByField !== value) {
      setSortType("asc");
    } else if (sortType === "asc") {
      setSortType("desc");
    } else {
      setSortType(null);
      setSortByField(null);
    }
  }

  function handleSearch(name, value) {
    setFilters((prevData) => {
      const updatedFilters = { ...prevData };

      if (value === "") {
        delete updatedFilters[name]; // Remove the filter if the value is empty
      } else {
        updatedFilters[name] = value; // Otherwise, update the filter
      }

      return updatedFilters;
    });
  }
  console.log(filters, "filters");
  useEffect(() => {
    if (clearTableFilters) {
      setFilters({});
      setActiveFilters([]);
      dispatch(clearAllTableFilters(false));
    }
  }, [clearTableFilters]);
  function handleShowSearchbar(field) {
    const isExisting = activeFilters?.some((item) => item === field);

    if (isExisting) {
      const array = activeFilters?.filter((item) => item === field);
      setActiveFilters([...array]);
    } else {
      setActiveFilters((prev) => [...prev, field]);
    }
    setFocusedField(field);
  }
  console.log(activeFilters, filters, "activefilter");
  const [dateClose] = useState(true);

  console.log(rowPadding, "dateClose");

  const tdStyles = (column, row) => {
    if (column.width || row?.[column?.field]?.length > 80) {
      return {
        overflowWrap: "break-word",

        whiteSpace: "initial",
      };
    }
  };

  const pWidth = (column, row) => {
    let width;

    if (column?.width) {
      width = column?.width;
    } else if (row?.[column?.field]?.length > 80) {
      width = 150;
    }
    return width;
  };
  console.log(activeFilters, "activeFilters");
  useEffect(() => {
    if (dateClose?.start_date === false) {
      setFilters({});
    }
  }, [dateClose]);
  //columns
  const renderEditableColumn = (column, index) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <th
        key={column.field}
        style={{ cursor: "pointer" }}
        onClick={() => handleOnClickHeader(index)}
      >
        <input
          type='text'
          style={{ padding: "5px" }}
          value={column.label}
          onChange={(e) => handleInputChange(index, e)}
          autoFocus
        />
      </th>
      <Tooltip title={column.isNcEditable ? "Close" : "Delete column"}>
        <IconButton
          style={{ color: "black", marginLeft: "-15px" }}
          onClick={() => handleInputBlur(index)}
        >
          {column.isNcEditable ? (
            <IoMdCloseCircleOutline />
          ) : (
            <MdOutlineDelete />
          )}
        </IconButton>
      </Tooltip>
    </div>
  );

  const renderColumnWithTooltip = (column, index, isFiltered) => (
    <th
      key={column.field}
      onClick={() => {
        handleShowSearchbar(column.field);
        if (column.error && renderOnlineBtn) {
          handleOnClickHeader(index);
        }
      }}
      style={{
        minWidth: column.enableSearch !== false ? 130 : "auto",
        backgroundColor: isFiltered ? "#f0f8ff" : "transparent", // Example of highlighting
        fontWeight: isFiltered ? "bold" : "normal", // Make the text bold if filtered
      }}
    >
      <div className='col-header-container'>
        {column.error ? (
          <div className='col-header-container-sub'>
            {column.label}
            {column.enableSearch !== false && <MdKeyboardArrowDown size={20} />}
            <IconButton style={{ color: "red" }}>
              <IoIosWarning />
            </IconButton>
          </div>
        ) : (
          <React.Fragment>
            {" "}
            <div className='col-header-container-sub'>
              {column.label}
              {column.enableSearch !== false && (
                <MdKeyboardArrowDown size={20} />
              )}
            </div>
            {!disableSortby && column.enableSearch !== false && (
              <RenderSortByIcon
                onClick={() => handleSortBy(column.field)}
                value={column.field}
              />
            )}
            {!disableSearch &&
              column.enableSearch !== false &&
              activeFilters?.includes(column.field) && (
                <RenderSearchField
                  filters={filters}
                  handleSearch={handleSearch}
                  setActiveFilters={setActiveFilters}
                  column={column}
                  isFocused={focusedField === column.field}
                  setFocusedField={setFocusedField}
                />
              )}
          </React.Fragment>
        )}
      </div>
    </th>
  );

  const renderSimpleColumn = (column, index, isFiltered) => (
    <th
      key={column.field}
      onClick={() => {
        handleShowSearchbar(column.field);
        if (column.error && renderOnlineBtn) {
          handleOnClickHeader(index);
        }
      }}
      style={{
        minWidth: column.enableSearch !== false ? 130 : "auto",
        backgroundColor: isFiltered ? "#f0f8ff" : "transparent", // Example of highlighting
        fontWeight: isFiltered ? "bold" : "normal", // Make the text bold if filtered
      }}
    >
      <div className='col-header-container'>
        {column.error ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {column.label}
            <IconButton style={{ color: "red" }}>
              <IoIosWarning />
            </IconButton>
          </div>
        ) : (
          <React.Fragment>
            <div className='col-header-container-sub'>
              {column.label === "Actions" ||
              column.label === "Action" ||
              column.label === "View Details" ? (
                <div
                  style={{
                    width: "15vw",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ textAlign: "center" }}>{column.label}</p>
                  {column.enableSearch !== false && (
                    <MdKeyboardArrowDown size={20} />
                  )}
                </div>
              ) : (
                column.label
              )}
              {column.label !== "Actions" && column.enableSearch !== false && (
                <MdKeyboardArrowDown size={20} />
              )}
            </div>
            {!disableSortby && column.enableSearch !== false && (
              <RenderSortByIcon
                sortByField={sortByField}
                sortType={sortType}
                onClick={() => handleSortBy(column.field)}
                value={column.field}
              />
            )}
            {!disableSearch &&
              column.enableSearch !== false &&
              activeFilters?.includes(column.field) && (
                <RenderSearchField
                  filters={filters}
                  handleSearch={handleSearch}
                  setActiveFilters={setActiveFilters}
                  column={column}
                  focusedFiled={focusedField}
                  isFocused={focusedField === column.field}
                  setFocusedField={setFocusedField}
                />
              )}
          </React.Fragment>
        )}
      </div>
    </th>
  );

  const renderColumn = (column, index, isFiltered) => {
    if (column.isNcEditable && renderOnlineBtn) {
      return renderEditableColumn(column, index);
    } else if (column.label?.length > 15) {
      return renderColumnWithTooltip(column, index, isFiltered);
    } else {
      return renderSimpleColumn(column, index, isFiltered);
    }
  };
  //rows
  const renderLoading = () => (
    <tbody>
      <div
        className='spinner-container'
        style={{ marginTop: marginNoData && "90px" }}
      >
        <CircularProgress size={35} style={{ color: "#6e8295" }} />
      </div>
    </tbody>
  );

  const renderNoData = () => (
    <div
      className='no-data'
      style={{ marginTop: marginNoData ? "100px" : "40px" }}
    >
      <h2>No Data Available!</h2>
    </div>
  );

  const renderCheckbox = (row) => (
    <td>
      <input
        type='checkbox'
        checked={selectedRows?.some((item) => item?.id === row?.id)}
        onChange={() => handleRowsSelection(row)}
      />
    </td>
  );
  const renderTableCell = (column, row) => {
    let color = null;
    const fieldValue = row?.[column?.field];

    if (fieldValue === "Running") {
      color = "#243a6e";
    } else if (fieldValue === "Stopped") {
      color = "#D66A43";
    }

    const cellContent = column?.renderComponent ? (
      <column.renderComponent {...row?.[column?.field]} />
    ) : (
      <p
        style={{
          width: pWidth(column, row),
          color: color,
        }}
      >
        {row?.[column?.field]}
      </p>
    );

    return (
      <td
        key={column?.field}
        style={{
          ...tdStyles(column, row), // Existing styles
          padding: rowPadding && "5px 15px", // Additional padding
        }}
        className='rows'
      >
        {cellContent}
      </td>
    );
  };

  const renderTableRow = (row) => {
    console.log(row, "row");
    return (
      <tr
        key={row?.id}
        onDoubleClick={() => handleDoubleClick(row)}
        className={selectedRows?.includes(row) ? "selected-row" : ""}
      >
        {checkboxSelection && row?.status.value === 1
          ? renderCheckbox(row)
          : checkboxSelection && (
              <td>
                <input
                  style={{ cursor: "unset" }}
                  disabled
                  type='checkbox'
                  checked={false}
                  //  onChange={() => handleRowsSelection(row)}
                />
              </td>
            )}
        {columns?.map((column) => renderTableCell(column, row))}
      </tr>
    );
  };

  let content = null;

  if (isLoading || loading) {
    content = renderLoading();
  } else if (rows.length !== 0) {
    content = <tbody>{rows?.map((row) => renderTableRow(row))}</tbody>;
  } else if (!hideRows) {
    content = <tbody>{renderNoData()}</tbody>;
  }
  //End of rows
  function RenderSearchField({
    column,
    filters,
    handleSearch,
    focusedFiled,
    isFocused,
    setActiveFilters,
    setFocusedField,
  }) {
    const ref = useRef(null);

    const handleClose = () => {
      if (filters?.[column.field] === "" || !filters?.[column.field]) {
        setActiveFilters((prevFilters) =>
          prevFilters.filter((filter) => filter !== column.field)
        );
      }
    };

    useOutsideClick(ref, handleClose);

    useEffect(() => {
      if (isFocused && ref.current) {
        ref.current.focus();
      }
    }, [isFocused]);
    console.log(isFocused, "focused");
    const handleFocus = () => {
      setFocusedField(column.field);
    };
    const handleBlur = () => {
      // Use a timeout to ensure the focus is not lost when interacting with date picker
      setTimeout(() => {
        if (
          column.searchType === "date" &&
          !ref.current.contains(document.activeElement)
        ) {
          setFocusedField(null); // Optionally set to null or handle accordingly
        }
      }, 100);
    };

    switch (column?.searchType) {
      case "date":
        return (
          <div
            className='date-input-container '
            onClick={(e) => e.stopPropagation()}
            ref={ref}
            onBlur={handleBlur}
          >
            <DatePicker
              selected={filters?.[column.field]}
              className='search-input'
              onChange={(date) => {
                handleSearch(column?.field, date);
                setFocusedField(column.field);
              }}
              calendarClassName='calendar'
              fixedHeight={false}
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
              placeholderText='MM/DD/YYYY'
            />
            <IoMdCloseCircleOutline
              className='date-cancel-icon'
              onClick={() => {
                handleSearch(column?.field, "");
                setFocusedField(column.field);
                setActiveFilters((prevFilters) =>
                  prevFilters.filter((filter) => filter !== column.field)
                );
              }}
            />
          </div>
        );

      case "menu":
        return (
          <div
            className='table-menu-container'
            style={{
              position: " absolute",
              top: activeFilters?.length > 1 ? "60px" : "40px",
              border: "1px solid black",
              borderRadius: "5px",
              left: "20px",
            }}
            onClick={(e) => e.stopPropagation()}
            ref={ref}
          >
            <SearchMenu
              options={column?.menuOptions || []}
              value={filters?.[column?.field]}
              onChange={(value) => {
                handleSearch(column?.field, value);
                setActiveFilters((prevFilters) =>
                  prevFilters.filter((filter) => filter !== column.field)
                );
                setFocusedField(column.field);
              }}
            />
          </div>
        );
      default:
        return (
          // <div className='search-input'>
          <div
            className='search-input-container '
            onClick={(e) => e.stopPropagation()}
          >
            {" "}
            <input
              ref={ref}
              onFocus={handleFocus}
              className='search-input'
              placeholder='search here'
              onChange={(e) => handleSearch(column?.field, e.target.value)}
              value={filters?.[column?.field]}
            />
          </div>
        );
    }
  }

  return (
    <div>
      <div className='table-container'>
        <div
          className='table'
          style={{
            display: "flex",
            flexDirection: "column",
            height: "90%",
          }}
        >
          <table
            style={{
              marginBottom: hideRows && "10px",
              height: dataLength < 4 && "100px",
            }}
          >
            <thead>
              <tr
                style={{
                  display: renderOnlineBtn ? "flex" : null,
                  flexDirection: renderOnlineBtn ? "row" : null,
                  alignItems: renderOnlineBtn ? "center" : null,
                }}
              >
                {/* checkbox select all */}
                {rows.length !== 0 && checkboxSelection && (
                  <th>
                    <input
                      className='select-all-checkbox'
                      type='checkbox'
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                )}

                {columns?.map((column, index) => {
                  const isFiltered = Object.prototype.hasOwnProperty.call(
                    filters,
                    column?.field
                  );
                  console.log(column, isFiltered, filters, "columnsss");

                  return renderColumn(column, index, isFiltered);
                })}
              </tr>
            </thead>

            {content}
          </table>
        </div>

        {rows.length !== 0 && (
          <div className='table-pagination-container'>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <p style={{ fontSize: 14, fontWeight: 500 }}>
                Results: {startIndex} -{" "}
                {endIndex > totalRecords ? totalRecords : endIndex} of{" "}
                {totalRecords}
              </p>

              {!showRowsLength && (
                <Select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setCurrentPage(1);
                    setItemsPerPage(e.target.value);
                  }}
                >
                  {limitOptions?.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </div>

            <Pagination
              count={totalPages}
              shape='rounded'
              size='small'
              onChange={(e, value) => {
                setCurrentPage(value);
                setSelectedRows([]);
                setSelectAll(false);
              }}
              page={currentPage}
              showFirstButton
              showLastButton
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Table;
function RenderSortByIcon({ sortType, sortByField, onClick, value }) {
  return sortType === "desc" && sortByField === value ? (
    <HiArrowDown className='sort-icon' title='Unsort' onClick={onClick} />
  ) : (
    <HiArrowUp
      className='sort-icon'
      color={sortType === null || sortByField !== value ? "#AAAAAA" : "#566D80"}
      title={
        sortType === null || sortByField !== value
          ? "Sort by ASC"
          : "Sort by DESC"
      }
      onClick={onClick}
    />
  );
}
