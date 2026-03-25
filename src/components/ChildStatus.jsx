
function ChildStatus({ child }) {

 if (!child) {
   return <div>子供を選択してください</div>
 }

 return (

   <div>

     <h3>ステータス</h3>

     <p>POINT : {child.point}</p>

     <p>GOAL : {child.goalPoint}</p>

     <p>LEVEL : {child.level}</p>

   </div>

 )

}

export default ChildStatus
