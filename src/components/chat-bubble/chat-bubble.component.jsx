import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chatBubbleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '10px 0',
  },
  chatBubble: {
    background: theme.palette.primary.light,
    borderRadius: '20px',
    padding: '12px',
    maxWidth: '80%',
    color: 'white',
    boxShadow: theme.shadows[1],
  },
}));

const ChatBubble = ({ text, side }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.chatBubbleContainer}
      style={{ alignSelf: side === 'right' ? 'flex-end' : 'flex-start' }}
    >
      <div className={classes.chatBubble}>{text}</div>
    </div>
  );
};

export default ChatBubble;