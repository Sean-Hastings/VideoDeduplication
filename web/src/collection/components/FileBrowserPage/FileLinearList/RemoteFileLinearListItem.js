import React, { useCallback } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { FileType } from "../../../prop-types/FileType";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import IconButton from "@material-ui/core/IconButton";
import { useIntl } from "react-intl";
import FileSummary from "../../FileSummary";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.palette.border.light,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  button: {
    cursor: "pointer",
    "&:hover": {
      borderColor: theme.palette.primary.light,
    },
  },
  summary: {
    flexGrow: 1,
    minWidth: 0,
  },
}));

/**
 * Get i18n text.
 */
function useMessages() {
  const intl = useIntl();
  return {
    containerLabel: intl.formatMessage({ id: "actions.showFileDetails" }),
    moreLabel: intl.formatMessage({ id: "actions.showMoreOptions" }),
  };
}

const RemoteFileLinearListItem = React.memo(function FpRemoteFileLinearListItem(
  props
) {
  const {
    file,
    button = false,
    highlight,
    onClick,
    className,
    ...other
  } = props;
  const messages = useMessages();

  const handleClick = useCallback(() => onClick(file), [file, onClick]);

  const classes = useStyles();
  return (
    <div
      onClick={handleClick}
      className={clsx(classes.container, button && classes.button, className)}
      aria-label={messages.containerLabel}
      data-selector="FileLinearListItem"
      data-file-id={file.id}
      {...other}
    >
      <FileSummary file={file} divider className={classes.summary}>
        <FileSummary.RemoteHash highlight={highlight} />
        <FileSummary.RemoteRepo />
        <FileSummary.RemoteOwner />
        <IconButton aria-label={messages.moreLabel}>
          <MoreHorizOutlinedIcon />
        </IconButton>
      </FileSummary>
    </div>
  );
});

RemoteFileLinearListItem.propTypes = {
  /**
   * File to be displayed
   */
  file: FileType.isRequired,
  /**
   * File name substring that should be highlighted.
   */
  highlight: PropTypes.string,
  /**
   * Handle item click action.
   */
  button: PropTypes.bool,
  /**
   * Handle item click.
   */
  onClick: PropTypes.func,
  /**
   * Use dense layout.
   */
  dense: PropTypes.bool,
  /**
   * Control preview blur.
   * Has no effect at the moment.
   */
  blur: PropTypes.bool,
  className: PropTypes.string,
};

export default RemoteFileLinearListItem;
