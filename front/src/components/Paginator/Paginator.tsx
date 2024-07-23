type PaginatorProps = {
  prev: (e?: any) => void;
  next: (e?: any) => void;
  total: number;
  current: number;
};

const Paginator = ({ prev, next, total, current }: PaginatorProps) => {
  return (
    <div>
      <button onClick={prev}>Prev</button>
      {total > 0 && `${current} / ${total}`}
      <button onClick={next}>Next</button>
    </div>
  );
};

export default Paginator;
