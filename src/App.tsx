import React, { createContext, Suspense, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';
import { ROUTES } from './utils/routes';
import { Toast } from './components/Toast/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { getTabs } from './store/tabsSlice';
import 'react-toastify/dist/ReactToastify.css';
import './utils/i18next'
import './App.css';
import { checkAuth } from './store/authSlice';

const Register = React.lazy(() => import('./pages/Auth/Auth'))
const Contacts = React.lazy(() => import("./pages/ContactsPage/ContactsPage"))
const ExtraDocuments = React.lazy(() => import("./pages/ExtraDocuments/ExtraDocuments"))
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"))
const CollectedDocuments = React.lazy(() => import("./pages/CollectedDocuments/CollectedDocuments"))
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword/ForgotPassword"))
const Instructions = React.lazy(() => import("./pages/Instructions/Instructions"))

export const TabsContext = createContext<{name: string, element: React.FC}[] | null>(null)

function App() {
  const isAuthorized = useSelector((state: RootState) => state.auth.authorized)
  const tabs = useSelector((state: RootState) => state.tabs.tabs)
  const routes = useMemo(() => {
    return tabs?.map(t => {
      let element: React.FC

      switch(t) {
        case 'DASHBOARD': 
          element = Dashboard
          break;
        case 'CONTACTS':
          element = Contacts
          break;
        case 'COLLECTED_DOCUMENTS':
          element = CollectedDocuments
          break;
        case 'PREPARED_DOCUMENTS':
          element = ExtraDocuments
          break;
        default:
          element = () => <></>
          break;
      }

      return {
        name: `${t.toLowerCase()}`,
        element: element
      }
    })
  }, [tabs])
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!isAuthorized || tabs.length) return
     
    dispatch(getTabs())
  }, [isAuthorized, dispatch, tabs.length])

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <TabsContext.Provider value={routes}>
          <Routes>
              <Route index element={<WelcomePage />} />
              <Route path={ROUTES.SIGN_UP} element={<Register />} />
              <Route path={ROUTES.LOGIN} element={<Register isLogin />} />
              <Route path={ROUTES.INSTRUCTIONS} element={<Instructions />} />
              <Route path={ROUTES.UPDATE_FORGOT_PASSWORD + "/:token"} element={<ForgotPassword />} />

              {routes?.map(r => {
                const Element = r.element
                return (
                    <Route path={`/${r.name}`} element={<Element />} key={r.name} />
                )
              })}

              <Route path='*' element={<Contacts />} />
          </Routes>
        </TabsContext.Provider>
      </Suspense>
      
      <Toast />
    </>
  );
}

export default App;
