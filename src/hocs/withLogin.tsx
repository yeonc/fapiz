const withLogin = (Component: any) => {
  return ({ isLoggedIn, ...props }) => isLoggedIn && <Component {...props} />
}

export default withLogin
