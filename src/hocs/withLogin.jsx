const withLogin = Component => {
  return ({ isLoggedIn, ...props }) => isLoggedIn && <Component {...props} />
}

export default withLogin
