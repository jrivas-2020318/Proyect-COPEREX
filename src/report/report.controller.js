import XlsxPopulate from "xlsx-populate";
import Company from '../enterprise/enterprise.model.js';
import path from 'path';
import fs from 'fs';

export const generateExcelReport = async () => {
    try {
        const folderPath = path.resolve('src', 'excel_reports')
        await fs.promises.mkdir(folderPath, { recursive: true })

        const companies = await Company.find({}).populate('category')
        const workbook = await XlsxPopulate.fromBlankAsync()
        const sheet = workbook.sheet(0)
        sheet.cell("A1").value('Name')
        sheet.cell("B1").value('Impact Level')
        sheet.cell("C1").value('Years Experience')
        sheet.cell("D1").value('Category')
        
        companies.forEach((company, index) => {
            const row = index + 2;
            const categoryName = company.category ? company.category.name : "No Category"
            sheet.cell(`A${row}`).value(company.name)
            sheet.cell(`B${row}`).value(company.impactLevel)
            sheet.cell(`C${row}`).value(company.yearsExperience)
            sheet.cell(`D${row}`).value(categoryName)
        })

        const timestamp = new Date().toISOString().replace(/[-T:.]/g, '')
        const fileName = `report_${timestamp}.xlsx`

        const filePath = path.join(folderPath, fileName)
        await workbook.toFileAsync(filePath)

        console.log(`Report saved to: ${filePath}`)
        return filePath

    } catch (error) {
        console.error('Error generating Excel report:', error)
        throw new Error("Failed to generate Excel report")
    }
}

export const getReport = async (req, res) => {
    try {
        const filePath = await generateExcelReport();
        res.status(200).send({
            success: true,
            message: `File has been successfully generated: ${path.basename(filePath)}`,
            filePath: filePath
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to generate Excel report"
        })
    }
}
