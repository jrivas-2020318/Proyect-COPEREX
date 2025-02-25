import Company from "../enterprise/enterprise.model.js"

export const registerCompany = async (req, res) => {
    try {
        const newCompany = new Company(req.body)
        await newCompany.save()
        res.status(201).send({ message: "Company registered successfully", company: newCompany })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

export const getCompanies = async (req, res) => {
    try {
        let filter = {}
        if (req.query.category) {
            filter.businessCategory = req.query.category
        }
        let order = req.query.order || 'name'
        const companies = await Company.find(filter).sort(order)
        res.send(companies)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

export const editCompany = async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        const company = await Company.findById(req.params.id)
        if (!company) {
            return res.status(404).send({ error: 'Company not found' })
        }

        updates.forEach((update) => company[update] = req.body[update])
        await company.save();
        res.send(company);
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}
