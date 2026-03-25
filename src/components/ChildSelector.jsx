function ChildSelector({ children, selectedChildId, onChange }) {

  return (

    <div>

      <label>子供選択：</label>

      <select
        value={selectedChildId ?? ""}
        onChange={(e) => onChange(Number(e.target.value))}
      >

        {children.map(child => (

          <option key={child.id} value={child.id}>
            {child.name}
          </option>

        ))}

      </select>

    </div>

  )

}

export default ChildSelector