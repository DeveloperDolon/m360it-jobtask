import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type {
  InputRef,
  TableColumnsType,
  TableColumnType,
  TablePaginationConfig,
} from "antd";
import { Button, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useProductListQuery } from "../../store/api/product.api";
import { Product } from "../../types";
import { NavLink } from "react-router";

type DataIndex = keyof Product;

interface Pagination {
  current: number;
  pageSize: number;
  total?: number;
}

const ProductTable = () => {
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const apiParams = {
    limit: pagination.pageSize,
    skip: (pagination.current - 1) * pagination.pageSize,
  };

  const { data: productList, isFetching } = useProductListQuery(apiParams);

  if (
    productList?.total !== undefined &&
    productList.total !== pagination.total
  ) {
    setPagination((prev) => ({ ...prev, total: productList.total }));
  }

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination({
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || 10,
      total: newPagination.total,
    });
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<Product> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<Product> = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      width: "20%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "10%",
      sorter: (a, b) => a.price - b.price,
      ...getColumnSearchProps("price"),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
      ...getColumnSearchProps("stock"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      ...getColumnSearchProps("brand"),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <Space>
          <NavLink to={`/product/edit/${id}`}>
            <Button size="small">Edit</Button>
          </NavLink>
          <Button size="small" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table<Product>
      columns={columns}
      dataSource={productList?.products || []}
      loading={isFetching}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
      onChange={handleTableChange}
      rowKey="id"
    />
  );
};

export default ProductTable;
