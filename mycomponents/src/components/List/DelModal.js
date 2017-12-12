import { Modal, Button } from 'antd';
const confirm = Modal.confirm;


function showDeleteConfirm(onOk) {
  confirm({
    title: '提示',
    content: '是否确定删除',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk(){
        onOk();
    },
    onCancel() {
    },
  });
}


 function DelModal({children,onOk}){
    return(
      <span onClick={()=>showDeleteConfirm(onOk)}>
        {children}
      </span>
    );
 }
 export default DelModal;   
