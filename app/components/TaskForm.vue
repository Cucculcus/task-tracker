<template>
  <div class="flex flex-col gap-4 max-w-full">
    <slot name="breadcrumps"></slot>
    <UFormField :label="$t('createTaskWindow.taskTitle.title')">
      <UInput
        v-model="title"
        :color="formErrors.titleError ? 'error' : 'neutral'"
        highlight
        class="w-2/3"
        :placeholder="$t('createTaskWindow.taskTitle.placeholder')"
      />
    </UFormField>

    <UFormField :label="$t('createTaskWindow.priority.title')">
      <div class="flex items-center gap-3">
        <USelect
          v-model="severityChoice"
          highlight
          :color="'neutral'"
          :items="severityItems"
          class="max-w-2/3 flex-1"
        ></USelect>
        <TaskSeverityIcon :severity="severityChoice" class="flex-none" />
      </div>
    </UFormField>

    <UFormField :label="$t('createTaskWindow.date.title')">
      <div class="grid grid-cols-2 gap-2">
        <UInputDate
          v-model="plannedCompletionCalendarDate"
          :color="formErrors.plannedCompletionDateError ? 'error' : 'neutral'"
          highlight
        />
        <UInputTime
          v-model="plannedCompletionCalendarTime"
          :color="formErrors.plannedCompletionDateError ? 'error' : 'neutral'"
          highlight
        />
      </div>
    </UFormField>

    <UFormField :label="$t('createTaskWindow.taskDescription.title')">
      <UTextarea
        v-model="text"
        :color="formErrors.emptyContentError ? 'error' : 'neutral'"
        highlight
        :placeholder="$t('createTaskWindow.taskDescription.placeholder')"
        class="w-2/3"
      />
    </UFormField>

    <UFormField
      :label="$t('createTaskWindow.subtasks.title')"
      v-if="task?.subtasks?.length > 0"
    >
      <div class="flex flex-col gap-2">
        <slot name="subtasks"></slot>
      </div>
    </UFormField>

    <UButton
      v-if="task"
      :ui="{
        base: 'justify-center',
      }"
      :label="$t('createTaskWindow.subtasks.createButton')"
      color="neutral"
      variant="subtle"
      class="w-2/3"
      @click="emit('onCreateSubtask')"
    />

    <UButton
      class="w-2/3"
      :ui="{
        base: 'justify-center',
      }"
      @click="
        $emit('submit', {
          title,
          severity: severityChoice,
          text,
          plannedCompletionDate,
        })
      "
      >{{
        task
          ? `${$t('createTaskWindow.createButtonText.edit')}`
          : `${$t('createTaskWindow.createButtonText.create')}`
      }}</UButton
    >
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types'
import type { severity } from '~/types/task.model'

const { t } = useI18n()
const emit = defineEmits(['submit', 'onCreateSubtask'])

const props = defineProps<{
  task?: Task
}>()

const formErrors = ref({
  titleError: computed(() => {
    if (!title.value) {
      return true
    }
    return false
  }),
  plannedCompletionDateError: computed(() => {
    if (!plannedCompletionDate.value) {
      return true
    }
    return false
  }),
  emptyContentError: computed(() => {
    if (!text.value && !props.task?.subtasks) {
      return true
    }
    return false
  }),
})

const title = ref(props.task?.title ?? '')
const severityItems = ref([
  { label: `${t('createTaskWindow.priority.value.hard')}`, value: 'hard' },
  { label: `${t('createTaskWindow.priority.value.middle')}`, value: 'middle' },
  { label: `${t('createTaskWindow.priority.value.easy')}`, value: 'easy' },
])
const severityChoice = ref<severity>(props.task?.severity ?? 'easy')

const text = ref(props.task?.text ?? '')

const plannedCompletionCalendarTime = ref(
  props.task ? dateToTime(props.task?.plannedCompletionDate) : null,
)
const plannedCompletionCalendarDate = ref(
  props.task ? dateToCalendarDate(props.task?.plannedCompletionDate) : null,
)

const plannedCompletionDate = computed(() => {
  if (
    plannedCompletionCalendarDate.value &&
    plannedCompletionCalendarTime.value
  ) {
    return calendarDateTimeToDate(
      plannedCompletionCalendarDate.value,
      plannedCompletionCalendarTime.value,
    )
  }
  return null
})
</script>
