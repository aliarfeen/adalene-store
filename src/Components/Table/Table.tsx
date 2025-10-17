
type Column<T> = {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
};

type TableProps<T> = {
    data: T[];
    columns: Column<T>[];
};

function Table<T extends { id: string | number }>({ data, columns }: TableProps<T>) {
    return (
        <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full text-sm">
                <thead>
                    <tr className="bg-orange-800 text-white">
                        {columns.map((col) => (
                            <th
                                key={String(col.key)}
                                className="px-4 py-3 text-left font-semibold"
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`${index % 2 === 0 ? "bg-[#F8F5EF]" : "bg-[#F8F5EF]"}`}
                            >
                                {columns.map((col) => (
                                    <td key={String(col.key)} className="px-4 py-3">
                                        {col.render ? col.render(item) : (item[col.key as keyof T] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="text-center py-4 text-gray-500"
                            >
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
