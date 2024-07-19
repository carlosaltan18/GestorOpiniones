'use strict'

import Category from './category.model.js'
import Publication from '../publication/publication.model.js'


export const addCategoryDefault = async (req, res) =>{
    try {
        let  categoryExist = await Category.findOne({categoryName: 'Default'})
        if (!categoryExist) {
            let newCategory = new Category({
                categoryName: 'Default',
                description: 'Default category',
              });
            let category = new Category(newCategory)
            await category.save()
            console.log('Category register correctly');
            } else {
            console.log('Alredy exist Category.');
            }
    
    } catch (error) {
        console.error(error)
        console.log('Fail add Category')
        
    }
}

export const addCategory = async (req, res) =>{
    try {
        let data = req.body
        console.log(data)
        let category = new Category(data)
        await category.save()
        return res.send({message: `Registered successfully,${category.categoryName} was register`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Faild add category ', error: error})
        
    }
}

export const updatedCategory = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updatedCategory = await Category.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
            )
        if(!updatedCategory) return res.status(404).send({message: ' Category not updated and not found'})
        return res.send({message: 'Category has been updated'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Faild update category'})
    }
}

export const deleteCategory = async (req, res) =>{
    try {
        let{id} = req.params
        let categoryDefault = await Category.findOne({categoryName: 'Default'})
        let idDefualt = categoryDefault._id
        let deletedCategory =  await Category.findOneAndDelete({_id: id})
        if(!deletedCategory) return res.status(404).send({message: 'Category not found and not deleted'})
        await Publication.updateMany({ category: id }, { $set: { category: idDefualt } });
        return res.send({message: `Category ${deletedCategory.categoryName} deleted successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Faild delete Category'})
    }

}

export const getCategory = async (req, res) =>{
    try {

        let category = await Category.find()
        if(!category) return res.status(404).send({message: 'category not found'})
        
        return res.send(category)
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Fail get category'})
    }
}