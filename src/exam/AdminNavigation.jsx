/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';

import ChevronDownIcon from './ChevronDown';
import ChevronUpIcon  from './ChevronUp';

//import './styles.scss';

// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace JSX {
//     interface IntrinsicElements {
//       ElemBefore: React.ReactNode;
//     }
//   }
// }

const NavItemProps = {
  title: '',
  itemId: '',
  // disabled?: boolean;
  elemBefore: false,
  subNav: [],
};

const SideNavProps = {
  items: [],
  activeItemId: '',
  // onSelect : ({itemId}) => void;
};

const AdminNavigation = ({ activeItemId, onSelect, items }) => {
  const [activeSubNav, setActiveSubNav] = useState({
    expanded: true,
    selectedId: activeItemId,
  });

  // Listen for parent prop changes and update state
  useEffect(() => {
    setActiveSubNav((originalSubNav) => ({
      expanded: originalSubNav.expanded,
      selectedId: activeItemId,
    }));
  }, [activeItemId]);

  const handleClick = (itemId) => {
    // call the callback if supplied
    onSelect?.({ itemId });
  };

  //NavItemProps
  const handleSubNavExpand = (item) => {
    if (activeSubNav.expanded) {
      const currentItemOrSubNavItemIsOpen =
        // either the parent item is expanded already
        item.itemId === activeSubNav.selectedId ||
        // or one of its expandable children is selected
        (item.subNav &&
          item.subNav.some((_subNavItem) => _subNavItem.itemId === activeSubNav.selectedId)) ||
        false;

      setActiveSubNav({
        expanded: item.subNav && item.subNav.length > 0 ? !currentItemOrSubNavItemIsOpen : false, // disable expansion value, if not expandable
        selectedId: item.itemId,
      });
    } else {
      setActiveSubNav({
        expanded: !!(item.subNav && item.subNav.length > 0), // expand if expandable
        selectedId: item.itemId,
      });
    }
  };

  return (
    <>
      {items.length > 0 && (
        <nav role="navigation" aria-label="side-navigation" className="side-navigation-panel">
          {/* : NavItemProps */}
          {items.map((item) => {
            const ElemBefore = item.elemBefore;
            const isItemSelected = item.itemId === activeSubNav.selectedId;
            const isActiveTab =
              // item is expanded and
              activeSubNav.expanded &&
              // either the current expandable section is selected
              (isItemSelected ||
                // or some item in the expandable section of the current item is selected or active
                (item.subNav &&
                  item.subNav.some(
                    // : NavItemProps
                    (_subNavItem) => _subNavItem.itemId === activeSubNav.selectedId,
                  )) ||
                false);

            return (
              <ul key={item.itemId} className="side-navigation-panel-select">
                <li className="side-navigation-panel-select-wrap">
                  <div
                    onClick={() => {
                      handleSubNavExpand(item);
                      handleClick(item.itemId);
                    }}
                    className={`side-navigation-panel-select-option ${
                      isItemSelected ? 'side-navigation-panel-select-option-selected' : ''
                    }`}
                  >
                    <span className="side-navigation-panel-select-option-wrap">
                      {/** Prefix Icon Component */}
                      {ElemBefore && <ElemBefore />}

                      <span className="side-navigation-panel-select-option-text">{item.title}</span>
                    </span>

                    {item.subNav &&
                      item.subNav.length > 0 &&
                      (isActiveTab ? <ChevronUpIcon /> : <ChevronDownIcon />)}
              
                  </div>
                </li>

                {item.subNav && item.subNav.length > 0 && isActiveTab && (
                  <ul className="side-navigation-panel-select-inner">
                    {item.subNav.map((subNavItem) => {
                      //: NavItemProps
                      const SubItemElemBefore = subNavItem.elemBefore;

                      return (
                        <li
                          key={subNavItem.itemId}
                          className="side-navigation-panel-select-inner-wrap"
                        >
                          <div
                            onClick={() => {
                              setActiveSubNav({
                                ...activeSubNav,
                                selectedId: subNavItem.itemId,
                              });
                              handleClick(subNavItem.itemId);
                            }}
                            className={`side-navigation-panel-select-inner-option ${
                              activeSubNav.selectedId === subNavItem.itemId
                                ? 'side-navigation-panel-select-inner-option-selected'
                                : ''
                            } `}
                          >
                            <span className="side-navigation-panel-select-inner-option-wrap">
                              {/** Prefix Icon Component */}
                              {SubItemElemBefore && <SubItemElemBefore />}

                              <span className="side-navigation-panel-select-inner-option-text">
                                {subNavItem.title}
                              </span>
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </ul>
            );
          })}
        </nav>
      )}
    </>
  );
};

export default AdminNavigation;
