import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Layout, PageHeader, Row } from 'antd';
import TableCustom from 'components/CustomTable';
import { pickBy } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  defaultPage,
  formatDate,
  formatDateTime,
  formatDateTimeFull,
} from '../../../util/constant';
import AccountEdit from './account.edit';
import { getRoleList, getUserList } from './student.service';

const defaultSort = {
  'is-ascending': 'true',
  'order-by': 'Id',
};
const AccountList = () => {
  const navigate = useNavigate();
  const [uniList, setUniList] = useState([]);
  const [loading, setLoading] = useState(false);
  // Pagination
  const [roleList, setRoleList] = useState([]);
  const [currentRow, setCurrentRow] = useState(); // Pagination
  const [params, setParams] = useState({ ...defaultPage });
  const [totalItem, setTotalItem] = useState();
  const [isEditModal, setIsEditModal] = useState(false);
  const [sortedInfo] = useState(defaultSort);
  const [form] = Form.useForm();

  const fetchUserList = (params, sortedInfo) => {
    setLoading(true);
    getUserList({ ...params })
      .then((result) => {
        setUniList([...result?.users]);
        setTotalItem(result?.count);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  const fetchRoleList = (params) => {
    getRoleList({ ...params })
      .then((result) => {
        setRoleList([...result]);
        // setTotalItem(result.data["total-count"]);
      })
      .catch((e) => {
        return false;
      });
  };

  useEffect(() => {
    fetchUserList(params);
  }, [params]);

  useEffect(() => {
    fetchRoleList(params);
  }, []);
  const columns = [
    {
      title: 'Họ tên ',
      dataIndex: 'fullName',
      width: '12%',
      ellipsis: true,
      render: (text, record) => {
        return (
          <Button size="small" type="link" onClick={() => {}}>
            {text}
          </Button>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '12%',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      width: '12%',
      render: (text) => {
        if (text === 'M') {
          return 'Male';
        } else if (text === 'F') {
          return 'Female';
        } else {
          return 'Others';
        }
      },
    },
    {
      title: 'Role ',
      dataIndex: 'role',
      width: '12%',
      render: (text) => text?.name,
    },
    {
      title: 'Action',
      align: 'center',
      width: '8%',
      fixed: 'right',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentRow(record);
              setIsEditModal(true);
            }}
          />
          <Button
            type="link"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => {}}
          />
        </div>
      ),
    },
  ];

  const extraButton = [
    <Button
      key="btn-complete"
      type="primary"
      onClick={() => {
        setCurrentRow(undefined);
        setIsEditModal(true);
      }}
    >
      {'Create'}
      <PlusOutlined />
    </Button>,
  ];

  const routes = [
    {
      path: '/dashboard',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '/user',
      breadcrumbName: 'user',
    },
  ];

  return (
    <Layout className="layoutContent">
      <PageHeader
        ghost={false}
        title="Account"
        extra={extraButton}
        breadcrumb={routes}
        className="customPageHeader"
      />
      <Layout.Content>
        <Card size="small" className="cardSearch">
          <Form
            form={form}
            layout="horizontal"
            className="customFormSearch"
            onFinish={(value) => {
              const cleanValue = pickBy(
                value,
                (v) => v !== undefined && v !== ''
              );
              setParams({
                ...cleanValue,
                page: 1,
                limit: params['limit'],
              });
            }}
          >
            <Row gutter={16}>
              <Col xxl={{ span: 6 }} md={8} sm={12} xs={24}>
                <Form.Item name="search-value">
                  <Input placeholder="keyword" allowClear={true} />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button
                    type="primary"
                    ghost
                    icon={<SearchOutlined />}
                    htmlType="submit"
                  >
                    {'Tìm kiếm'}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <TableCustom
          title={() => (
            <Row>
              <Col span={12}>
                <h3> {'Danh sách người dùng'}</h3>
              </Col>
            </Row>
          )}
          rowKey="id"
          loading={loading}
          bordered
          columns={columns}
          dataSource={uniList}
          onChange={(pagination, filters, sorter) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (pagination.pageSize !== params.limit) {
              params.page = 1;
            } else {
              params.page = pagination.current;
            }
            params.limit = pagination.pageSize;
            setParams({ ...params });
          }}
          pagination={{
            total: totalItem,
            showSizeChanger: true,
            pageSize: params.limit,
            current: params.page,
          }}
          scroll={{ x: 1200 }}
        />
        <AccountEdit
          currentRow={currentRow}
          onCallback={(value) => {
            setParams({ ...defaultPage });
            setIsEditModal(false);
          }}
          isEditModal={isEditModal}
          setIsEditModal={setIsEditModal}
          roleList={roleList}
        />
      </Layout.Content>
    </Layout>
  );
};

export default AccountList;
