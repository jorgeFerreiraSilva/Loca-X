import React from 'react';
import Button from '@material-ui/core/Button';


const MyButton = ({ text }) => (
    <div>
      <Button variant="outlined" color="primary">
        {text}
      </Button>
    </div>
  );

export default MyButton;
