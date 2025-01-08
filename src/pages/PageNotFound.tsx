
const PageNotFound = ({dados}) => {

const { tasks, users } = dados
console.log('minha props',dados)
  return (
    <div>
    {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
            <h2>{task.title}</h2>
            <p><strong>Prioridade:</strong> {task.priority}</p>
            <p><strong>Progresso:</strong> {task.progress}%</p>
            <p><strong>Membros:</strong> {task.members.join(", ")}</p>
          </div>
        ))
      ) : (
        <p>Nenhuma tarefa encontrada.</p>
      )}
  </div>
  );
};

export default PageNotFound;
