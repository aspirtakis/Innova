import { Badge, Table, Input, Button, Popconfirm, Form,Dropdown,Menu,Icon,Select} from 'antd';
import React from 'react';
import AssumptionStatus from './assumptionStatus';

const { Option } = Select;

const menu = (
  <Menu>
    <Menu.Item>Done</Menu.Item>
    <Menu.Item>In Progress</Menu.Item>
  </Menu>
);


const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);


class EditableCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    editing: false,
    };
  };

  toggleEditCombo = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
       
      }
    });
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };
  
  saveCombo = category => {
    const { record, handleSave } = this.props;
      handleSave({ ...record, category, });
      this.setState({editing:false})
  };

  saveComboCheck = status => {
    const { record, handleSave } = this.props;
      handleSave({ ...record, status, });
      this.setState({editing:false})
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title, fieldType } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  renderCombo = form => {
    this.form = form;
    const { children, dataIndex, record, title, fieldType } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
  <Select defaultValue={record.category} style={{ width: 120 }} onChange={this.saveCombo}>
      <Option value="Viability">Viability</Option>
      <Option value="Feasibility">Feasibility</Option>
      <Option value="Desirability" >Desirability</Option>
    </Select>
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEditCombo}
      >
        {children}
      </div>
    );
  };

  renderComboCheck = form => {
    this.form = form;
    const { children, dataIndex, record, title, fieldType } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
  <Select defaultValue={record.status} style={{ width: 120 }} onChange={this.saveComboCheck}>
      <Option value="Backlog">Backlog</Option>
      <Option value="Doing">Doing</Option>
      <Option value="Done" >Done</Option>
    </Select>
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEditCombo}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      fieldType,
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? <div>{ fieldType === 'TextField' && (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) }
        { fieldType === 'ComboBox' && (
          <EditableContext.Consumer>{this.renderCombo}</EditableContext.Consumer>
        ) }
        { fieldType === 'ComboBoxCheck' && (
          <EditableContext.Consumer>{this.renderComboCheck}</EditableContext.Consumer>
        ) }
        </div>
        
        : (
          children
        )}
      </td>
    );
  }
}


class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visiblePopoverRecId:0,
    };
    this.columns = [
      {
        title: 'Assumption',
        dataIndex: 'title',
        width: '50%',
        editable: true,
        fieldType:"TextField",
      },
      {
        title: 'Category',
        dataIndex: 'category',
        editable: true,
        fieldType:"ComboBox",
      },
      {
        title: 'Status',
        dataIndex: 'status',
        editable: false,
        fieldType:"ComboBox",
        render: (text,record) => (
          <span className="table-operation">
          {record.status === "Accepted" &&  <Badge status="success" />}
          {record.status === "Rejected" &&  <Badge status="error" />}
          {record.status === "Processing" &&  <Badge status="processing" />}
 
          {record.status}
      
          </span>
        ),
      },

      {
        title: 'Actions',
        dataIndex: 'operation',
        key: 'operation',
        render: (text,record) => (
          <span className="table-operation">      

       
          <AssumptionStatus 
          record={record} 
          result={record.result} 
          onCloseResult={() => this.setState({visiblePopoverRecId:null})}
          onSave={(result,status) => {
            this.props.saveAssumption(record,result,status);
            this.setState({visiblePopoverRecId:null});
          }} 
          open={this.state.visiblePopoverRecId}>
          </AssumptionStatus>
       
       
          <Icon  style={{margin:5}} onClick={() => this.setState({visiblePopoverRecId:record.id})} type="check" />

           <Popconfirm title="Delete Assumption?" onConfirm={() => this.props.deleteAssumption(record)}>
           <Icon  style={{margin:5}} type="delete" />
        </Popconfirm>

          </span>
        ),
      },


    ];
  }


addCheck = (r) => {
  this.props.addChecklist(r);
}

  expandedRowRender = (r) => {
    const columns2 = [
      { title: 'Title', 
      width: '60%', 
      editable: true, 
      dataIndex: 'title', 
      key: 'title',
      editable:true,
      fieldType:"TextField",
      
    },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status', 
        editable: true, 
        fieldType:"ComboBoxCheck",
        render: (text, record) => (

          <span>
            {record.status === 'Backlog' && <Badge status="error" />}
            {record.status === 'Doing' && <Badge status="processing" />}
            {record.status === 'Done' && <Badge status="success" />}
            {record.status}
          </span>
        ),
      },

      {
        title: 'Actions',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) =>
          <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteChecklist(r,record.id)}>
            <a>Delete</a>
          </Popconfirm>
      },
    ];

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns4 = columns2.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          fieldType:col.fieldType,
          handleSave: (row) => this.props.saveChecklist(r,row),
        }),
      };
    });

    return <div>
    <Button onClick={() => this.addCheck(r)}>Add Experiment</Button>
    <Table            
    components={components}
    rowClassName={() => 'editable-row'}
    bordered columns={columns4} 
    dataSource={r.experiments} 
    pagination={true} />
    </div>;
  };

  render() {
    const { assumptions } = this.props;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          fieldType:col.fieldType,
          handleSave: this.props.saveAssumption,
        }),
      };
    });

    return (
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={assumptions}
          expandedRowRender={(r) => this.expandedRowRender(r)}
          columns={columns}
        />
      </div>
    );
  }
}

export default EditableTable;