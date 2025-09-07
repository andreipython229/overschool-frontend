import React, { useState, useMemo } from 'react'
import { useGetAccessLogsQuery } from '../../api/accessLogsService'
import { Modal, Box, Typography, IconButton, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import styles from './AccessLogs.module.scss'

// Компонент модального окна
const LogDetailsModal: React.FC<{
  isOpen: boolean
  log: any
  onClose: () => void
  getMethodColor: (method: string) => string
  getStatusColor: (status: number) => string
  formatDate: (dateString: string) => string
}> = ({ isOpen, log, onClose, getMethodColor, getStatusColor, formatDate }) => {
  if (!isOpen || !log) return null

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="log-details-modal" aria-describedby="log-details-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 800,
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Заголовок */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 3,
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'grey.50',
          }}
        >
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            Детали запроса
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Содержимое */}
        <Box
          sx={{
            p: 3,
            overflowY: 'auto',
            flex: 1,
          }}
        >
          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 140, mr: 2 }}>
              ID:
            </Typography>
            <Typography variant="body2">{log.id}</Typography>
          </Box>

          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 140, mr: 2 }}>
              Метод:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: getMethodColor(log.method),
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              {log.method}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 140, mr: 2 }}>
              Путь:
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
              {log.path}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 140, mr: 2 }}>
              Статус:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: getStatusColor(log.status_code),
                fontWeight: 'bold',
              }}
            >
              {log.status_code}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 140, mr: 2 }}>
              Время ответа:
            </Typography>
            <Typography variant="body2">{log.response_ms}ms</Typography>
          </Box>

          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 140, mr: 2 }}>
              Дата запроса:
            </Typography>
            <Typography variant="body2">{formatDate(log.requested_at)}</Typography>
          </Box>

          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 140, mr: 2 }}>
              IP адрес:
            </Typography>
            <Typography variant="body2">{log.remote_addr}</Typography>
          </Box>

          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 140, mr: 2 }}>
              Хост:
            </Typography>
            <Typography variant="body2">{log.host}</Typography>
          </Box>

          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 140, mr: 2 }}>
              Email пользователя:
            </Typography>
            <Typography variant="body2">{log.user_email || '-'}</Typography>
          </Box>

          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 140, mr: 2 }}>
              Представление:
            </Typography>
            <Typography variant="body2">{log.view}</Typography>
          </Box>

          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 140, mr: 2 }}>
              Метод представления:
            </Typography>
            <Typography variant="body2">{log.view_method}</Typography>
          </Box>

          {log.data && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Данные запроса:
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  bgcolor: 'grey.50',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  maxHeight: 200,
                  overflow: 'auto',
                }}
              >
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{log.data}</pre>
              </Paper>
            </Box>
          )}

          {log.query_params && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Параметры запроса:
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  bgcolor: 'grey.50',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  maxHeight: 200,
                  overflow: 'auto',
                }}
              >
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{log.query_params}</pre>
              </Paper>
            </Box>
          )}

          {log.response && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Ответ:
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  bgcolor: 'grey.50',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  maxHeight: 200,
                  overflow: 'auto',
                }}
              >
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{log.response}</pre>
              </Paper>
            </Box>
          )}

          {log.errors && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Ошибки:
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  bgcolor: 'grey.50',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  maxHeight: 200,
                  overflow: 'auto',
                }}
              >
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{log.errors}</pre>
              </Paper>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  )
}

export const AccessLogs: React.FC = () => {
  const [filters, setFilters] = useState({
    email: '',
    method: '',
    status: '',
    requested_at__gte: '',
    requested_at__lte: '',
    p: 1,
    s: 20,
  })

  const [selectedLog, setSelectedLog] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Создаем стабильный объект для запроса
  const queryParams = useMemo(
    () => ({
      email: filters.email,
      method: filters.method,
      status: filters.status,
      requested_at__gte: filters.requested_at__gte,
      requested_at__lte: filters.requested_at__lte,
      p: filters.p,
      s: filters.s,
    }),
    [filters.email, filters.method, filters.status, filters.requested_at__gte, filters.requested_at__lte, filters.p, filters.s],
  )

  const { data, isLoading, error, refetch, isFetching } = useGetAccessLogsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value, p: 1 }

    // Преобразуем числовые значения
    if (key === 's') {
      newFilters.s = parseInt(value, 10)
    }

    setFilters(newFilters)
  }

  const handleDateFilterChange = (key: string, value: string) => {
    // Преобразуем дату в формат ISO с временем
    let formattedDate = ''
    if (value) {
      // Создаем дату в локальном времени
      const [year, month, day] = value.split('-').map(Number)
      const date = new Date(year, month - 1, day) // month - 1 потому что месяцы в JS начинаются с 0

      if (key === 'requested_at__gte') {
        // Для начальной даты устанавливаем время 00:00:00
        date.setHours(0, 0, 0, 0)
      } else if (key === 'requested_at__lte') {
        // Для конечной даты устанавливаем время 23:59:59
        date.setHours(23, 59, 59, 999)
      }
      formattedDate = date.toISOString()
    }

    setFilters(prev => ({ ...prev, [key]: formattedDate, p: 1 }))
  }

  // Функция для преобразования ISO даты в формат YYYY-MM-DD для инпута
  const formatDateForInput = (isoDate: string): string => {
    if (!isoDate) return ''
    const date = new Date(isoDate)
    // Используем локальное время для отображения
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handlePageChange = (page: number) => {
    if (page < 1) return
    setFilters(prev => ({ ...prev, p: page }))
  }

  const handleRowClick = (log: any) => {
    setSelectedLog(log)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedLog(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return '#4CAF50'
    if (status >= 400 && status < 500) return '#FF9800'
    if (status >= 500) return '#F44336'
    return '#757575'
  }

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET':
        return '#2196F3'
      case 'POST':
        return '#4CAF50'
      case 'PUT':
        return '#FF9800'
      case 'DELETE':
        return '#F44336'
      default:
        return '#757575'
    }
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка логов...</div>
      </div>
    )
  }

  // Показываем индикатор загрузки при смене страницы
  if (isFetching && !isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Обновление данных...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Ошибка загрузки логов</div>
      </div>
    )
  }

  return (
    <>
      <LogDetailsModal
        isOpen={isModalOpen}
        log={selectedLog}
        onClose={closeModal}
        getMethodColor={getMethodColor}
        getStatusColor={getStatusColor}
        formatDate={formatDate}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Логи запросов на платформе</h1>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{data?.count || 0}</span>
              <span className={styles.statLabel}>Всего записей</span>
            </div>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <input
              type="text"
              placeholder="Email пользователя"
              value={filters.email}
              onChange={e => handleFilterChange('email', e.target.value)}
              className={styles.filterInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <select value={filters.method} onChange={e => handleFilterChange('method', e.target.value)} className={styles.filterSelect}>
              <option value="">Все методы</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <select value={filters.status} onChange={e => handleFilterChange('status', e.target.value)} className={styles.filterSelect}>
              <option value="">Все статусы</option>
              <option value="200">200 - Успешно</option>
              <option value="400">400 - Ошибка клиента</option>
              <option value="500">500 - Ошибка сервера</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <input
              type="date"
              value={formatDateForInput(filters.requested_at__gte)}
              onChange={e => handleDateFilterChange('requested_at__gte', e.target.value)}
              className={styles.filterInput}
              placeholder="Дата с"
            />
          </div>

          <div className={styles.filterGroup}>
            <input
              type="date"
              value={formatDateForInput(filters.requested_at__lte)}
              onChange={e => handleDateFilterChange('requested_at__lte', e.target.value)}
              className={styles.filterInput}
              placeholder="Дата по"
            />
          </div>

          <div className={styles.filterGroup}>
            <select value={filters.s} onChange={e => handleFilterChange('s', e.target.value)} className={styles.filterSelect}>
              <option value={10}>10 записей</option>
              <option value={20}>20 записей</option>
              <option value={50}>50 записей</option>
              <option value={100}>100 записей</option>
            </select>
          </div>
        </div>

        <div className={styles.tableContainer}>
          {data?.results && data.results.length > 0 ? (
            <table className={styles.table}>
              <thead className={styles.table_thead}>
                <tr>
                  <th style={{ width: '80px' }} title="HTTP метод запроса">
                    Метод
                  </th>
                  <th style={{ width: '300px' }} title="Путь запроса">
                    Путь
                  </th>
                  <th style={{ width: '80px' }} title="HTTP статус ответа">
                    Статус
                  </th>
                  <th title="Дата и время запроса">Дата запроса</th>
                  <th title="IP адрес клиента">IP адрес</th>
                  <th title="Email пользователя">Email</th>
                  <th style={{ width: '250px' }} title="Django представление">
                    Представление
                  </th>
                </tr>
              </thead>
              <tbody className={styles.table_tbody}>
                {data.results.map((log, index) => (
                  <tr key={log.id} onClick={() => handleRowClick(log)}>
                    <td style={{ width: '80px' }}>
                      <span
                        style={{
                          color: getMethodColor(log.method),
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                        }}
                      >
                        {log.method}
                      </span>
                    </td>
                    <td className={styles.pathCell} style={{ width: '300px' }}>
                      {log.path}
                    </td>
                    <td style={{ width: '80px' }}>
                      <span
                        style={{
                          color: getStatusColor(log.status_code),
                          fontWeight: 'bold',
                        }}
                      >
                        {log.status_code}
                      </span>
                    </td>
                    <td>{formatDate(log.requested_at)}</td>
                    <td>{log.remote_addr}</td>
                    <td>{log.user_email || '-'}</td>
                    <td className={styles.viewCell} style={{ width: '250px' }}>
                      {log.view}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.emptyState}>
              <p>Записи не найдены</p>
            </div>
          )}
        </div>

        {data && data.count > 0 && data.results && data.results.length > 0 && (
          <div className={styles.pagination}>
            <button onClick={() => handlePageChange(1)} disabled={filters.p <= 1} className={styles.paginationButton} title="Первая страница">
              ⟪
            </button>
            <button onClick={() => handlePageChange(filters.p - 1)} disabled={!data.previous || filters.p <= 1} className={styles.paginationButton}>
              Назад
            </button>
            <span className={styles.pageInfo}>
              Страница {filters.p} из {Math.ceil(data.count / filters.s)} ({(filters.p - 1) * filters.s + 1}-
              {Math.min(filters.p * filters.s, data.count)} из {data.count} записей)
            </span>
            <button onClick={() => handlePageChange(filters.p + 1)} disabled={!data.next} className={styles.paginationButton}>
              Вперед
            </button>
            <button
              onClick={() => handlePageChange(Math.ceil(data.count / filters.s))}
              disabled={!data.next}
              className={styles.paginationButton}
              title="Последняя страница"
            >
              ⟫
            </button>
          </div>
        )}
      </div>
    </>
  )
}
