import React, { useState } from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import { routeMap } from "@/router/routeMap";
import { handleCheckRoute, hasPermission } from "@/utils/helper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleSetIsShowSideBarMobi } from "@/states/modules/app";
import { Drawer } from 'antd';

function SideBarMobi(props) {
    const { isShowSideBarMobi } = props
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [indexNavItemSelect, setIndexNavItemSelect] = useState(null);

    const handleToggleMenu = (indexNavItem, menuNavItem) => {
        if (menuNavItem.path) {
            navigate(menuNavItem.path)
        }
        if (handleSetIsShowSideBarMobi) {
            setIndexNavItemSelect(indexNavItem !== indexNavItemSelect ? indexNavItem : null)
        }
        dispatch(handleSetIsShowSideBarMobi(false))
    }

    const handleCheckRouteActive = (routeActive) => {
        let isActive = false;
        if (handleCheckRoute(routeActive, location.pathname, params)) {
          isActive = true
        }
        return isActive;
    }

    return (
        <Drawer
            className={`drawer-side-bar-mobi`}
            open={isShowSideBarMobi}
            placement='left'
            closable={true}
            width={240}
            onClose={() => dispatch(handleSetIsShowSideBarMobi(false))}
        >
            <div className={`${styles.sideBarWrap}`}>
                <div className={`${styles.navbarWrap}`}>
                    <ul className={`${styles.menuNav}`}>
                        {
                            routeMap.map((route, index) => {
                                if (!route.permissions || hasPermission(route.permissions) || route.permissions?.length === 0) {
                                    return (
                                        <li
                                            key={route.path}
                                            onClick={() => handleToggleMenu(index, route)}
                                            className={`
                                                ${styles.menuNavItem}
                                                ${handleCheckRoute(route.routeActive, location.pathname) ? styles.menuNavItemActive : ''}
                                        `}>
                                            <div 
                                                className={`
                                                    ${styles.navItemWrap} 
                                                    ${!isShowSideBarMobi ? styles.navItemCloseWrap : ''} 
                                                    ${handleCheckRouteActive(route.routeActive) ? styles.navItemActiveWrap : ''}
                                            `}>
                                                <div className={styles.textWrap}>
                                                    <div className={styles.iconWrap}>{route.icon}</div>
                                                    <span className={styles.text}>{route.label}</span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        </Drawer>
    );
}

export default SideBarMobi
