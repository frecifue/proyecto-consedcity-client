import React, { useState, useMemo } from 'react';
import { Loader } from 'semantic-ui-react';
import { size } from 'lodash';
import './DynamicTable.scss';

export function DynamicTable({
  columns,
  data,
  loading,
  emptyMessage,
  perPage = 10,
  rowKey = 'id',
  searchable,
  searchKeys,
  onSearch,
  serverPagination,
  onPageChange,
}) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const isServerPagination = !!serverPagination;

  const filtered = useMemo(() => {
    if (isServerPagination || !search || !searchKeys) return data || [];
    const q = search.toLowerCase();
    return (data || []).filter(row =>
      searchKeys.some(k => String(row[k] ?? '').toLowerCase().includes(q))
    );
  }, [data, search, searchKeys, isServerPagination]);

  const sorted = useMemo(() => {
    if (isServerPagination || !sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey];
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortAsc, isServerPagination]);

  const totalPages = isServerPagination
    ? serverPagination.pages
    : Math.max(1, Math.ceil(sorted.length / perPage));

  const currentPage = isServerPagination
    ? serverPagination.page
    : Math.min(page, totalPages);

  const slice = isServerPagination
    ? sorted
    : sorted.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handlePageChange = (newPage) => {
    if (isServerPagination) onPageChange?.(newPage);
    else setPage(newPage);
  };

  const handleSort = (key) => {
    if (sortKey === key) setSortAsc(prev => !prev);
    else { setSortKey(key); setSortAsc(true); }
    if (!isServerPagination) setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (isServerPagination) onSearch?.(e.target.value);
    else setPage(1);
  };

  if (loading) return <Loader active inline="centered" />;
  if (!data) return null;

  return (
    <div className="dynamic-table">
      {searchable && (
        <div className="dynamic-table__toolbar">
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={handleSearch}
          />
          {!isServerPagination && (
            <span className="dynamic-table__count">
              {sorted.length} resultado{sorted.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}

      <div className="dynamic-table__wrapper">
        <table>
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className={[
                    col.sortable && !isServerPagination ? 'sortable' : '',
                    sortKey === col.key ? 'active' : '',
                  ].join(' ')}
                  onClick={col.sortable && !isServerPagination ? () => handleSort(col.key) : undefined}
                >
                  {col.label}
                  {col.sortable && !isServerPagination && (
                    <span className="sort-icon">
                      {sortKey === col.key ? (sortAsc ? '▲' : '▼') : '▲'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="dynamic-table__empty">
                  Sin resultados
                </td>
              </tr>
            ) : (
              slice.map((row, i) => (
                <tr key={row[rowKey] ?? i}>
                  {columns.map(col => (
                    <td key={col.key}>
                      {col.render ? col.render(row) : row[col.key] ?? ''}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="dynamic-table__pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}