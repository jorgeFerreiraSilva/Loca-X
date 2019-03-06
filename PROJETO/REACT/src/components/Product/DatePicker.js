import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});


class DatePicker extends React.Component {
  constructor() {
    super();
    this.state = {
      date: ''
    };
    this.updateState = this.updateState.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    console.log(this.state.date);
  }

  updateState(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value }, () => {
      console.log(this.state);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate onSubmit={this.handleFormSubmit}>
          <TextField
          id="date"
          label="Date"
          type="date"
          name="date"
          onChange={e => this.updateState(e)}
          defaultValue="2019-03-15"
          className={classes.textField}
          InputLabelProps={{
              shrink: true
            }}
        />
        <input type="submit" value="submit" />
        </form>
    );
  }
}

DatePicker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DatePicker);
