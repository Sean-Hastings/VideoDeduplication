import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import NavLink, { LinkType } from "./NavLink";

const useStyles = makeStyles((theme) => ({
  links: {
    display: "flex",
  },
  variantVertical: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  variantHorizontal: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkHorizontal: {},
  linkVertical: {
    paddingBottom: theme.spacing(0.5),
  },
}));

function NavLinkList(props) {
  const {
    links,
    selected,
    onSelect,
    variant = "horizontal",
    decorate = true,
    className,
    ...other
  } = props;

  const classes = useStyles();
  return (
    <div
      className={clsx(
        classes.links,
        {
          [classes.variantHorizontal]: variant === "horizontal",
          [classes.variantVertical]: variant === "vertical",
        },
        className
      )}
      {...other}
    >
      {links.map((link) => (
        <NavLink
          link={link}
          selected={link.title === selected.title}
          onClick={onSelect}
          key={link.title}
          className={clsx({
            [classes.linkHorizontal]: variant === "horizontal",
            [classes.linkVertical]: variant === "vertical",
          })}
          role="link"
          decorated={decorate}
        />
      ))}
    </div>
  );
}

NavLinkList.propTypes = {
  variant: PropTypes.oneOf(["horizontal", "vertical"]),
  selected: PropTypes.any.isRequired,
  onSelect: PropTypes.func,
  links: PropTypes.arrayOf(LinkType).isRequired,
  decorate: PropTypes.bool,
  className: PropTypes.string,
};

export default NavLinkList;
