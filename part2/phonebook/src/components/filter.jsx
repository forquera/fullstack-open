export const Filter = ({ filterValue, handleFilterValue }) => {
  return (
    <div>
      buscar: <input value={filterValue} onChange={handleFilterValue} />
    </div>
  );
};
