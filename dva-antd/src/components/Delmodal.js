import { Modal, Button } from 'antd';
const confirm = Modal.confirm;


function showDeleteConfirm(onOk) {
  confirm({
    title: 'Are you sure delete this task?',
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk(){
        onOk();
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}


 function Delmodal({children,onOk}){
    return(
      <span onClick={()=>showDeleteConfirm(onOk)}>
        {children}
      </span>
    );
 }
 export default Delmodal;   

