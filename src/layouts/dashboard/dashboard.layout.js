import React from 'react';
import { Layout, Menu, Badge, Avatar, Dropdown } from 'antd';
import {
  DownOutlined,
  UserOutlined,
  BellOutlined,
  EditOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import './styles.less';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { authAction, logoutStart } from 'redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
const { Header } = Layout;

// import logo from "assets/logo.png";

const DashboardLayout = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menu = (
    <Menu
      onClick={(e) => {
        if (e.key == 1) {
          dispatch(authAction.logout());
          navigate('/login');
        }
      }}
    >
      <Menu.Item key="0" disabled style={{ cursor: 'default' }}>
        <div>{localStorage.getItem('email')}</div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <LoginOutlined onClick={() => {}} />
        {'Log out'}
      </Menu.Item>
    </Menu>
  );

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Layout className="dashboard-layout">
      {props.sider}
      <Layout>
        <Header className="header">
          {
            <div className="header-container">
              <p style={{ color: 'white' }}>
                {localStorage.getItem('__role') === 'R03' && 'Marketing'}
                {localStorage.getItem('__role') === 'R04' && 'Saler'}
                {localStorage.getItem('__role') === 'R05' && 'Sale Manager'}
                {localStorage.getItem('__role') === 'R00' && 'Admin'}
              </p>
              <div className="profile-container">
                <Dropdown overlay={menu}>
                  <div className="profile">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <div
                      style={{
                        color: 'white',
                        fontWeight: 600,
                        marginRight: 6,
                        marginLeft: 3,
                      }}
                    >
                      {localStorage.getItem('name')}
                    </div>
                    <DownOutlined
                      style={{
                        fontSize: '14px',
                        color: 'white',
                        paddingTop: 1,
                      }}
                      theme="outlined"
                    />
                  </div>
                </Dropdown>
                <div id="space" />
                <Dropdown
                  placement="bottomCenter"
                  style={{ top: 75 }}
                  overlay={
                    <Menu style={{ marginTop: 22 }}>
                      <Menu.Item key="0">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.antgroup.com"
                        >
                          1st menu item
                        </a>
                      </Menu.Item>
                      <Menu.Item key="1">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.aliyun.com"
                        >
                          2nd menu item
                        </a>
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key="3" disabled>
                        3rd menu item（disabled）
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Badge dot>
                    <BellOutlined style={{ fontSize: 24, color: 'white' }} />
                  </Badge>
                </Dropdown>
              </div>
            </div>
          }
        </Header>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
