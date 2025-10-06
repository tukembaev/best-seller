export default function StockBadge({ status, remainInStock }) {
  const isInStock = status;
  const statusText = isInStock ? 'В наличии' : 'Нет в наличии';
  const bgColor = isInStock ? 'bg-blue-300' : 'bg-red-200';
  const textColor = isInStock ? 'text-blue-600' : 'text-red-600';
  const spanBgColor = isInStock ? 'bg-blue-600' : 'bg-red-600';

  const remainText = remainInStock > 0 ? `Осталось ${remainInStock}` : 'Скоро в продаже'  

  return (
    <div className={`inline-flex items-center gap-3 ${bgColor} ${textColor} pr-4 p-1 rounded-full text-xs sm:text-sm my-2`}>
      <span className={`${spanBgColor} px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs`}>
        {statusText}
      </span>
      {remainText}
    </div>
  );
}