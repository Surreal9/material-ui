let React = require('react');
let StylePropable = require('../mixins/style-propable');


let TableRowColumn = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    columnNumber: React.PropTypes.number,
    hoverable: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onHover: React.PropTypes.func,
    onHoverExit: React.PropTypes.func,
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      hoverable: false,
    };
  },

  getInitialState() {
    return {
      hovered: false,
    };
  },

  getTheme() {
    return this.context.muiTheme.component.tableRowColumn;
  },

  getStyles() {
    let theme = this.getTheme();
    let styles = {
      root: {
        paddingLeft: theme.spacing,
        paddingRight: theme.spacing,
        height: theme.height,
        textAlign: 'left',
        fontSize: 13,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    };

    if (React.Children.count(this.props.children) === 1 && !isNaN(this.props.children)) {
      styles.textAlign = 'right';
    }

    return styles;
  },

  render() {
    let {
      className,
      columnNumber,
      hoverable,
      onClick,
      onHover,
      onHoverExit,
      style,
      ...other,
    } = this.props;
    let styles = this.getStyles();
    let handlers = {
      onClick: this._onClick,
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
    };
    let classes = 'mui-table-row-column';
    if (className) classes += ' ' + className;

    return (
      <td
        key={this.props.key}
        className={classes}
        style={this.mergeAndPrefix(styles.root, style)}
        dangerouslySetInnerHTML={{__html: this.props.children}}
        {...handlers}
        {...other}>
      </td>
    );
  },

  _onClick(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.columnNumber);
  },

  _onMouseEnter(e) {
    if (this.props.hoverable) {
      this.setState({hovered: true});
      if (this.props.onHover) this.props.onHover(e, this.props.columnNumber);
    }
  },

  _onMouseLeave(e) {
    if (this.props.hoverable) {
      this.setState({hovered: false});
      if (this.props.onHoverExit) this.props.onHoverExit(e, this.props.columnNumber);
    }
  },

});

module.exports = TableRowColumn;
