import * as React from 'react';
import { Avatar, Row, Button, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { authActions } from './auth.actions';
import { AuthStoreState } from './coretypes';
import { MainCol } from './HelperComponents';

class Navbar extends React.Component<AuthStoreState, {}> {
  render() {
    return (
      <Row type="flex" justify="center" style={{padding: 0 }}>
        <MainCol>
          <Menu
            mode="horizontal"
            style={{ lineHeight: '64px'}}
            selectedKeys={[]}
          >
            <Menu.Item key="home">
               <Link to="/" style={{fontSize: 20}}>Neuroscout</Link>
            </Menu.Item>
            {this.props.loggedIn ?
              <Menu.SubMenu
                style={{float: 'right'}}
                title={
                  <Avatar
                    shape="circle"
                    icon="user"
                    src={this.props.avatar}
                    className="headerAvatar"
                  />
                }
              >
                 <Menu.ItemGroup title={`${this.props.gAuth ? this.props.gAuth.profileObj.email : this.props.email}`}>
                   <Menu.Divider/>
                   <Menu.Item key="predictorCollections">
                     <Link to="/mycollections"> My Predictors </Link>
                   </Menu.Item>
                    
                   <Menu.Item
                    key="signout"
                    onClick={(e) => {return authActions.confirmLogout(); }}
                   >
                    Sign Out
                   </Menu.Item>
                 </Menu.ItemGroup>
              </Menu.SubMenu>
             :
              <Menu.Item key="signup" style={{float: 'right'}}>
              <Button size="large" type="primary" onClick={e => authActions.update({ openSignup: true })}>
                Sign up</Button></Menu.Item>
             }
             {this.props.loggedIn === false &&
                 <Menu.Item
                  onClick={e => authActions.update({ openLogin: true })}
                  key="signin"
                  style={{float: 'right'}}
                 >
                   Sign in
                 </Menu.Item>
              }
             <Menu.Item
              style={{float: 'right'}}
              key="help"
             >
               <Link to="/faq"><span><Icon type="question-circle"/>Help</span></Link>
             </Menu.Item>

             <Menu.SubMenu
              style={{float: 'right'}}
              key="browse"
              className="browseMain"
              title={<span><Icon type="search"/>Browse</span>}
             >
               {this.props.loggedIn &&
                 <Menu.Item key="mine" >
                  <Link to="/myanalyses">
                    My analyses
                  </Link>
                 </Menu.Item>
              }
               <Menu.Item
                key="public"
               >
               <Link to="/public">
                Public analyses
                </Link>
               </Menu.Item>
             </Menu.SubMenu>

             {this.props.loggedIn &&
               <Menu.Item key="create" style={{float: 'right'}} className="newAnalysis">
                 <Link
                   to={{pathname: '/builder'}}
                 >
                   <Icon type="plus" /> New Analysis
                 </Link>
               </Menu.Item>
             }
          </Menu>
        </MainCol>
      </Row>
    );
  }
}

export default Navbar;
