const Router = require('express')
const router = new Router()
const projectBibleTemplateController = require('../controller/projectBibleTemplate.controller')

//Запросы к таблице project_bible_template
router.get('/projectBibleTemplate', projectBibleTemplateController.getProjectBibleTemplates)
router.get('/projectBibleTemplateGenerateIndividualCode', projectBibleTemplateController.projectBibleTemplateGenerateIndividualCode)
router.post('/projectBibleTemplateAddColumnToTheEnd', projectBibleTemplateController.setProjectBibleTemplateAddColumnToTheEnd)
router.post('/projectBibleTemplateAddColumn', projectBibleTemplateController.setProjectBibleTemplateAddColumn)
router.post('/projectBibleTemplateIncNumPredAddColumn', projectBibleTemplateController.setProjectBibleTemplateIncNumPredAddColumn)
router.post('/projectBibleTemplateUpdateColumnTemplate', projectBibleTemplateController.projectBibleTemplateUpdateColumnTemplate)
router.post('/projectBibleTemplateMoveUpColumn', projectBibleTemplateController.setProjectBibleTemplateMoveUpColumn)
router.post('/projectBibleTemplateMoveDownColumn', projectBibleTemplateController.setProjectBibleTemplateMoveDownColumn)
router.post('/projectBibleTemplateDecNumPredDeleteColumn', projectBibleTemplateController.setProjectBibleTemplateDecNumPredDeleteColumn)
router.post('/projectBibleTemplateDeleteColumn', projectBibleTemplateController.setProjectBibleTemplateDeleteColumn)


//Запросы к таблице project_bible_template && project_bible_template_rows
router.post('/projectBibleTemplateRowsColumns', projectBibleTemplateController.getProjectBibleColumnsRowsTemplate)

//Запросы к таблице project_bible_template_text
router.post('/projectBibleTemplateTextByName', projectBibleTemplateController.getProjectBibleTextTemplateValue)

//Запросы к таблице project_bible_template_bool
router.post('/projectBibleTemplateBoolByName', projectBibleTemplateController.getProjectBibleBoolTemplateValue)

//Запросы к таблице project_bible_info
router.post('/projectBibleInfo', projectBibleTemplateController.getProjectBibleInfo)
router.post('/projectBibleInfoInsert', projectBibleTemplateController.setProjectBibleInfoInsert)

//Запросы к таблице project_bible_text
router.post('/projectBibleFilledCellTextByName', projectBibleTemplateController.getProjectBibleTextGetCellValue)
router.post('/projectBibleOninputUpdateTextCell', projectBibleTemplateController.setProjectBibleOninputUpdateTextCell)
router.post('/projectBibleOninputInsertTextCell', projectBibleTemplateController.setProjectBibleOninputInsertTextCell)

//Запросы к таблице project_bible_bool
router.post('/projectBibleFilledCellBoolByName', projectBibleTemplateController.getProjectBibleBoolGetCellValue)
router.post('/projectBibleOninputUpdateBoolCell', projectBibleTemplateController.setProjectBibleOninputUpdateBoolCell)
router.post('/projectBibleOninputInsertBoolCell', projectBibleTemplateController.setProjectBibleOninputInsertBoolCell)








// router.post('/projectBibleTemplate', projectBibleTemplateController.createProjectBibleTemplate)
// router.get('/projectBibleTemplate', projectBibleTemplateController.getProjectBibleTemplates)
// router.get('/projectBibleTemplate/:name', projectBibleTemplateController.getOneProjectBibleTemplate)
// router.put('/projectBibleTemplate', projectBibleTemplateController.updateProjectBibleTemplate)
// router.delete('/projectBibleTemplate/:name', projectBibleTemplateController.deleteProjectBibleTemplate)

router.get('/projectBibleTemplateText', projectBibleTemplateController.getProjectBibleTemplatesText)

// router.post('/projectBibleTemplateTextByName', projectBibleTemplateController.getProjectBibleTemplateTextByName)
// router.post('/projectBibleTemplateBoolByName', projectBibleTemplateController.getProjectBibleTemplateBoolByName)

router.post('/projectBibleOninputPredSave', projectBibleTemplateController.predSetProjectBibleOninputSave)
router.post('/projectBibleOninputInsertRow', projectBibleTemplateController.predSetProjectBibleOninputInsertSave)
router.post('/projectBibleOninputUpdateRow', projectBibleTemplateController.predSetProjectBibleOninputUpdateSave)

// router.post('/projectBibleInfoInsert', projectBibleTemplateController.setProjectBibleInfoInsert)

router.post('/projectBibleGetFilledCells', projectBibleTemplateController.getProjectBibleFilledCell)

module.exports = router