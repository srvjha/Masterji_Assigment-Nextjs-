"use client"

import * as React from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

type Task = {
  id: string
  title: string
  description: string
  dueDate: Date
}

type Column = {
  id: string
  title: string
  tasks: Task[]
}

export default function Kanban() {
  const [columns, setColumns] = React.useState<Column[]>([
      {
        id: "todo",
        title: "To Do",
        tasks: [],
      },
      {
        id: "inprogress",
        title: "In Progress",
        tasks: [],
      },
      {
        id: "completed",
        title: "Completed",
        tasks: [],
      }
    ]
  )
 
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [selectedColumnId, setSelectedColumnId] = React.useState<string | null>(null)
  const [newTask, setNewTask] = React.useState<Partial<Task>>({
    title: "",
    description: "",
    dueDate: new Date(),
  })

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const savedColumns = localStorage.getItem("columns")
      if (savedColumns) {
        setColumns(JSON.parse(savedColumns))
      }
    }
  }, [])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("columns", JSON.stringify(columns))
    }
  }, [columns])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const sourceColumn = columns.find((col) => col.id === result.source.droppableId)
    const destColumn = columns.find((col) => col.id === result.destination.droppableId)

    if (!sourceColumn || !destColumn) return

    const sourceTasks = [...sourceColumn.tasks]
    const destTasks = sourceColumn === destColumn ? sourceTasks : [...destColumn.tasks]
    const [removed] = sourceTasks.splice(result.source.index, 1)
    destTasks.splice(result.destination.index, 0, removed)

    setColumns(
      columns.map((col) => {
        if (col.id === result.source.droppableId) {
          return { ...col, tasks: sourceTasks }
        }
        if (col.id === result.destination.droppableId) {
          return { ...col, tasks: destTasks }
        }
        return col
      })
    )
  }

  const handleAddTask = () => {
    if (!selectedColumnId || !newTask.title || !newTask.description || !newTask.dueDate) return

    const newTaskComplete: Task = {
      id: Math.random().toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
    }

    setColumns(
      columns.map((col) => {
        if (col.id === selectedColumnId) {
          return { ...col, tasks: [...col.tasks, newTaskComplete] }
        }
        return col
      })
    )

    setNewTask({ title: "", description: "", dueDate: new Date() })
    setIsDialogOpen(false)
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Kanban Board</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div key={column.id} className={`bg-gray-100 dark:bg-gray-800 rounded-lg ${column.tasks.length === 0 ? "h-[120px]":""} p-4`}>
              <h2 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">{column.title}</h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3 min-h-[100px]"
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm"
                          >
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">{task.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{task.description}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              Due: {format(task.dueDate, "dd/MM/yyyy")}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div className={`${column.tasks.length === 0 ? "-mt-[99px]":"mt-3" } `}>
              <Button
                variant="outline"
                className="w-full bg-white dark:bg-gray-900"
                onClick={() => {
                  setSelectedColumnId(column.id)
                  setIsDialogOpen(true)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add a new task
              </Button>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Add New Task</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">Please enter the details for the new task below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Title
              </label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Enter task title"
                className="dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Description
              </label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Enter task description"
                className="dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Due Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newTask.dueDate && "text-muted-foreground",
                      "dark:bg-gray-800 dark:text-gray-100"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newTask.dueDate ? format(newTask.dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 dark:bg-gray-800">
                  <Calendar
                    mode="single"
                    selected={newTask.dueDate}
                    onSelect={(date) => setNewTask({ ...newTask, dueDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="dark:bg-gray-800 dark:text-gray-100">
              Cancel
            </Button>
            <Button onClick={handleAddTask} className="dark:bg-blue-600 dark:hover:bg-blue-700">
              Add Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
